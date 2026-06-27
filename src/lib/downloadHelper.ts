// public/download.worker.js

self.onmessage = async (event) => {
  console.log("Worker: Perintah diterima dari UI.");
  const { url, token } = event.data;

  try {
    const headers = new Headers();
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const blob = await response.blob();

    // Kirim data blob kembali ke UI thread
    self.postMessage({ status: "completed", size: blob.size });
  } catch (error) {
    console.error("Worker: Terjadi error.", error);
    self.postMessage({
      status: "error",
      error: (error as Error).message ?? "Unknown error occurred",
    });
  }
};
