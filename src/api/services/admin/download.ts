import { apiClient } from "@/api/core/AxiosInstance";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export class DownloadService {
  private async downloadExcel(
    endpoint: string,
    defaultFilename: string,
    customFilename?: string,
  ): Promise<{ blob: Blob; filename: string }> {
    try {
      const response = await apiClient.getBlob(endpoint, {
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      if (!response.data || response.data.size === 0) {
        throw new Error(
          "Respons dari server bukan file yang valid atau file kosong.",
        );
      }

      if (response.data.type === "application/json") {
        const errorText = await response.data.text();
        const errorJson = JSON.parse(errorText) as ErrorResponse;
        throw new Error(
          errorJson.message || "Server mengembalikan pesan error.",
        );
      }

      const rawContentType = response.headers["content-type"];
      const contentType =
        typeof rawContentType === "string"
          ? rawContentType
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      const blob = new Blob([response.data], { type: contentType });

      let finalFilename = defaultFilename;

      if (customFilename?.trim()) {
        finalFilename = customFilename.trim();
        if (!finalFilename.toLowerCase().endsWith(".xlsx")) {
          finalFilename += ".xlsx";
        }
      } else {
        const disposition = response.headers["content-disposition"];
        if (disposition && disposition.indexOf("filename=") !== -1) {
          finalFilename = disposition.split("filename=")[1].replace(/"/g, "");
        }
      }

      return { blob, filename: finalFilename };
    } catch (error) {
      console.error(`Gagal mengunduh ${defaultFilename}:`, error);

      if (error instanceof AxiosError && error.response?.data instanceof Blob) {
        const errorText = await error.response.data.text();
        try {
          const errorJson = JSON.parse(errorText) as ErrorResponse;
          throw new Error(
            errorJson.message ||
              `Terjadi kesalahan: ${error.response.statusText}`,
          );
        } catch {
          throw new Error(`Gagal mengunduh: ${error.response.statusText}`);
        }
      }

      if (error instanceof Error) {
        throw new Error(error.message || `Gagal mengunduh ${defaultFilename}.`);
      }
      throw new Error(`Gagal mengunduh ${defaultFilename}.`);
    }
  }

  async downloadPenilaian(customFilename?: string): Promise<void> {
    const { blob, filename } = await this.downloadExcel(
      "/excel/penilaian",
      "Data_Penilaian.xlsx",
      customFilename,
    );
    DownloadService.triggerDownload(blob, filename);
  }

  async downloadPenugasan(customFilename?: string): Promise<void> {
    const { blob, filename } = await this.downloadExcel(
      "/api/dashboard/excel/penugasan",
      "Data_Penugasan.xlsx",
      customFilename,
    );
    DownloadService.triggerDownload(blob, filename);
  }

  async downloadPresensi(customFilename?: string): Promise<void> {
    const { blob, filename } = await this.downloadExcel(
      "/api/dashboard/excel/presensi",
      "Data_Presensi.xlsx",
      customFilename,
    );
    DownloadService.triggerDownload(blob, filename);
  }

  async downloadMahasiswa(customFilename?: string): Promise<void> {
    const { blob, filename } = await this.downloadExcel(
      "/api/dashboard/excel/mahasiswa",
      "Data_Mahasiswa.xlsx",
      customFilename,
    );
    DownloadService.triggerDownload(blob, filename);
  }

  static triggerDownload(blob: Blob, filename: string): void {
    try {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to trigger download:", error);
      throw new Error("Failed to save file");
    }
  }
}

export const downloadService = new DownloadService();
