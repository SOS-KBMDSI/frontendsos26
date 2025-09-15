import { downloadService } from "@/api/services/admin/download";
import { useState } from "react";

interface UseDownloadReturn {
  isLoading: boolean;
  error: string | null;
  download: (customFilename?: string) => Promise<void>;
  clearError: () => void;
}

type DownloadType = "penilaian" | "penugasan" | "mahasiswa" | "presensi";

function useDownload(type: DownloadType): UseDownloadReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const download = async (customFilename?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validasi downloadService tersedia
      if (!downloadService) {
        throw new Error("Download service tidak tersedia");
      }

      // Direct method calls berdasarkan type
      switch (type) {
        case "penilaian":
          await downloadService.downloadPenilaian(customFilename);
          break;
        case "penugasan":
          await downloadService.downloadPenugasan(customFilename);
          break;
        case "presensi":
          await downloadService.downloadPresensi(customFilename);
          break;
        case "mahasiswa":
          await downloadService.downloadMahasiswa(customFilename);
          break;
        default:
          throw new Error(`Download type '${type}' tidak didukung`);
      }
    } catch (err) {
      console.error("Download error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Download gagal";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    download,
    clearError,
  };
}

export default useDownload;
