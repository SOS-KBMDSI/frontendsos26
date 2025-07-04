import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  AxiosError,
} from "axios";

const PROXY_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Lightweight request queue for better handling
const requestQueue: Array<() => Promise<void>> = [];
let isProcessing = false;

async function processQueue(): Promise<void> {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      await request();
      // Very minimal delay to prevent overwhelming
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }
  isProcessing = false;
}

async function makeRequestWithRetry<T = unknown>(
  config: AxiosRequestConfig,
  maxRetries = 3
): Promise<AxiosResponse<T>> {
  return new Promise((resolve, reject) => {
    requestQueue.push(async () => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await axios<T>(config);
          resolve(response);
          return;
        } catch (error) {
          const axiosError = error as AxiosError;
          const status = axiosError.response?.status;

          console.log(
            `Attempt ${attempt} failed for ${config.url} - Status: ${status}`
          );

          // Handle rate limiting from backend
          if (status === 429 && attempt < maxRetries) {
            // Respect backend rate limiting with exponential backoff
            const retryAfter = axiosError.response?.headers?.["retry-after"];
            const delay = retryAfter
              ? parseInt(retryAfter as string) * 1000
              : Math.pow(2, attempt) * 1000 + Math.random() * 1000;

            console.log(
              `Backend rate limited, waiting ${delay}ms before retry...`
            );
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }

          // Don't retry on client errors (400-499) except 429
          if (status && status >= 400 && status < 500 && status !== 429) {
            reject(axiosError);
            return;
          }

          // Retry on server errors (500+) or network errors
          if (attempt === maxRetries) {
            reject(axiosError);
            return;
          }
        }
      }
    });

    void processQueue();
  });
}

async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_session")?.value;

    const { path: pathSegments } = await context.params;
    const path = pathSegments.join("/");

    if (!path) {
      return NextResponse.json({ message: "Invalid path" }, { status: 400 });
    }

    const searchParams = request.nextUrl.search;
    const destinationUrl = `${PROXY_API_BASE_URL}/${path}${searchParams}`;

    const headers: Record<string, string> = {
      Accept: request.headers.get("Accept") ?? "application/json",
      "User-Agent": "NextJS-Proxy/1.0",
      // Forward original IP for backend rate limiting
      "X-Forwarded-For":
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown",
      "X-Real-IP": request.headers.get("x-real-ip") || "unknown",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    let body: FormData | Record<string, unknown> | null = null;
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      body = await request.formData();
    } else if (contentType?.includes("application/json")) {
      body = await request.json();
      headers["Content-Type"] = "application/json";
    }

    const response = await makeRequestWithRetry<Buffer>({
      method: request.method as Method,
      url: destinationUrl,
      headers,
      data: body,
      timeout: 30000,
      responseType: "arraybuffer",
    });

    const responseHeaders = new Headers();
    Object.entries(response.headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        responseHeaders.set(key, value);
      }
    });

    return new NextResponse(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const responseHeaders = new Headers();

      console.error("Proxy Error:", {
        status,
        statusText: error.response?.statusText,
        message: error.message,
        url: request.url,
        timestamp: new Date().toISOString(),
      });

      if (error.response?.headers) {
        Object.entries(error.response.headers).forEach(([key, value]) => {
          if (typeof value === "string") {
            responseHeaders.set(key, value);
          }
        });
      }

      // Forward backend rate limiting response
      if (status === 429) {
        const retryAfter =
          (error.response?.headers?.["retry-after"] as string) || "5";
        return NextResponse.json(
          {
            message:
              "Terlalu banyak permintaan. Silakan coba lagi setelah beberapa saat.",
            retryAfter: `${retryAfter} detik`,
          },
          {
            status: 429,
            headers: {
              ...Object.fromEntries(responseHeaders.entries()),
              "Retry-After": retryAfter,
            },
          }
        );
      }

      return new NextResponse(error.response?.data ?? "Backend error", {
        status,
        headers: responseHeaders,
      });
    }

    console.error("Unknown error:", error);
    return NextResponse.json(
      { message: "Internal proxy server error." },
      { status: 500 }
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
