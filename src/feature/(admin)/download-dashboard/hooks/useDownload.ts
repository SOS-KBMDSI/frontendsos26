import {
  downloadService,
  DownloadService,
} from "@/api/services/admin/download";
import { useState } from "react";

interface UseDownloadReturn {
  isLoading: boolean;
  error: string | null;
  download: (customFilename?: string) => Promise<void>;
}

type DownloadType = "penilaian" | "penugasan" | "mahasiswa";

const downloadConfig = {
  penilaian: {
    method: "downloadPenilaian",
    filename: "Data_Penilaian.xlsx",
    successMessage: "Data penilaian berhasil didownload",
  },
  penugasan: {
    method: "downloadPenugasan",
    filename: "Data_Penugasan.xlsx",
    successMessage: "Data penugasan berhasil didownload",
  },
  mahasiswa: {
    method: "downloadMahasiswa",
    filename: "data_mahasiswa.xlsx",
    successMessage: "Data mahasiswa berhasil didownload",
  },
} as const;

function useDownload(type: DownloadType): UseDownloadReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async (customFilename?: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const config = downloadConfig[type];
      const method = config.method as keyof DownloadService;

      const blob = await (downloadService[method] as () => Promise<Blob>)();

      // Tentukan nama file final
      // Jika customFilename ada dan tidak kosong, gunakan itu. Jika tidak, gunakan default.
      const finalFilename = customFilename?.trim()
        ? customFilename
        : config.filename;

      // Pastikan ekstensi .xlsx ada
      const filenameWithExt = finalFilename.endsWith(".xlsx")
        ? finalFilename
        : `${finalFilename}.xlsx`;

      DownloadService.triggerDownload(blob, filenameWithExt);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Download failed";
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
  };
}
export default useDownload;
