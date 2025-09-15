import { apiClient } from "@/api/core/AxiosInstance";
import { AxiosError } from "axios";
interface ErrorResponse {
  message: string;
}

export class DownloadService {
  private async downloadExcel(
    endpoint: string,
    filename: string,
  ): Promise<Blob> {
    try {
      const response = await apiClient.get(endpoint, {
        responseType: "blob", // Ini kunci utamanya
        headers: {
          // Header 'Content-Type' di request GET tidak perlu, hapus saja.
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      // Jika data yang diterima BUKAN blob atau ukurannya 0, baru kita anggap error.
      if (!(response.data instanceof Blob) || response.data.size === 0) {
        throw new Error(
          "Respons dari server bukan file yang valid atau file kosong.",
        );
      }

      // Jika blob-nya bertipe JSON, berarti itu pesan error dari backend
      if (response.data.type === "application/json") {
        const errorText = await response.data.text();
        const errorJson = JSON.parse(errorText) as ErrorResponse;
        throw new Error(
          errorJson.message || "Server mengembalikan pesan error.",
        );
      }

      // Langsung kembalikan blob-nya! Tidak perlu cek aneh-aneh lagi.
      return response.data;
    } catch (error) {
      console.error(`Gagal mengunduh ${filename}:`, error);

      if (error instanceof AxiosError && error.response?.data instanceof Blob) {
        // Coba baca blob error dari server untuk pesan yang lebih jelas
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

      // Lempar error yang sudah ada atau error umum
      if (error instanceof Error) {
        throw new Error(error.message || `Gagal mengunduh ${filename}.`);
      }
      throw new Error(`Gagal mengunduh ${filename}.`);
    }
  }

  async downloadPenilaian(): Promise<Blob> {
    return this.downloadExcel("/excel/penilaian", "Data_Penilaian.xlsx");
  }

  async downloadPenugasan(): Promise<Blob> {
    return this.downloadExcel("/excel/penugasan", "Data_Penugasan.xlsx");
  }

  async downloadPresensi(): Promise<Blob> {
    return this.downloadExcel("/excel/presensi", "Data_Presensi.xlsx");
  }

  async downloadMahasiswa(): Promise<Blob> {
    return this.downloadExcel("/excel/mahasiswa", "Data_Mahasiswa.xlsx");
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
