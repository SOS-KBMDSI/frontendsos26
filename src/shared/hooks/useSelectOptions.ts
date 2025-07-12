import { SelectOption, selectService } from "@/api/services/select/select";
import { useEffect, useState } from "react";

// Hook ini sekarang menerima 'type' sebagai argumen
export const useSelectOptions = (
  type: "kelompok" | "distrik" | "mahasiswa" | "rangkaian",
) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keluar jika tipe tidak valid untuk mencegah panggilan API yang tidak perlu
    if (!type) {
      setIsLoading(false);
      return;
    }

    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        // Gunakan parameter 'type' untuk memanggil service secara dinamis
        const response = await selectService.getOptions(type);
        setOptions(response.data);
      } catch (error) {
        // Pesan error juga dibuat dinamis
        console.error(`Gagal mengambil data ${type}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [type]); // Tambahkan `type` ke dependency array agar hook berjalan ulang jika tipe berubah

  // Kembalikan nama properti yang lebih generik
  return { options, isLoading };
};
