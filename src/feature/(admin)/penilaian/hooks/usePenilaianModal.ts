import { useState, useEffect, useCallback, useContext } from "react";
import { penilaianService } from "@/api/services/admin/penilaian";
import { DetailPenilaianMaba, PelanggaranItem } from "../types";
import { ToastContext } from "@/shared/context/ToastContext";

export const usePenilaianModal = (
  nim: string | null,
  rangkaianId: string,
  isOpen: boolean,
) => {
  const toastContext = useContext(ToastContext);
  const [detailMaba, setDetailMaba] = useState<DetailPenilaianMaba | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && nim) {
      let isMounted = true;
      const fetchDetail = async () => {
        setIsLoading(true);
        try {
          const response = await penilaianService.getDetailPenilaianMaba(
            nim,
            rangkaianId,
          );
          if (isMounted) setDetailMaba(response);
        } catch (error) {
          console.error("Gagal memuat detail mahasiswa:", error);
          if (isMounted) setDetailMaba(null);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      };
      fetchDetail();
      return () => {
        isMounted = false;
      };
    } else {
      setDetailMaba(null);
    }
  }, [isOpen, nim, rangkaianId]);

  const handleSubmit = useCallback(
    async (
      keaktifan: number,
      pelanggaran: PelanggaranItem[],
      submissionCallback: () => void,
    ) => {
      if (!nim || !rangkaianId || !detailMaba || !toastContext) return;
      try {
        const promises = [];
        if (detailMaba.keaktifan !== keaktifan) {
          promises.push(
            penilaianService.postKeaktifan(nim, rangkaianId, { keaktifan }),
          );
        }
        if (pelanggaran.length > 0) {
          promises.push(
            penilaianService.postPelanggaran({
              nim,
              rangkaian_id: rangkaianId,
              pelanggaran,
            }),
          );
        }
        if (promises.length === 0) {
          submissionCallback();
          return;
        }
        await Promise.all(promises);

        toastContext.showToast({
          type: "success",
          title: "Sukses!",
          message: `Data penilaian untuk ${detailMaba.nama_mahasiswa} berhasil diperbarui.`,
        });

        submissionCallback();
      } catch (error) {
        console.error("Gagal menyimpan perubahan:", error);
        toastContext.showToast({
          type: "error",
          title: "Gagal Menyimpan",
          message: "Terjadi kesalahan saat menyimpan data. Coba lagi.",
        });
      }
    },
    [nim, rangkaianId, detailMaba, toastContext],
  );

  return {
    detailMaba,
    isLoading,
    handleSubmit,
  };
};
