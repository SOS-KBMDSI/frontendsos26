import { PelanggaranItem } from "../types";
import { useMemo } from "react";

interface TabelDetailPelanggaranProps {
  pelanggaran: PelanggaranItem[];
}

export const TabelDetailPelanggaran = ({
  pelanggaran,
}: TabelDetailPelanggaranProps) => {
  const totalPoin = useMemo(() => {
    return pelanggaran.reduce((sum, item) => sum + item.nilai, 0);
  }, [pelanggaran]);

  return (
    <div>
      {/* UKURAN FONT JUDUL DIKECILKAN DI MOBILE */}
      <h2 className="text-lg md:text-2xl font-bold text-default-dark mb-4">
        Detail Pelanggaran
      </h2>
      <div className="w-full">
        <table
          // Menghapus `whitespace-nowrap` agar teks bisa turun baris
          className="w-full border-separate"
          // Mengurangi spasi antar baris
          style={{ borderSpacing: "0 0.5rem" }}
        >
          <thead>
            {/* UKURAN FONT HEADER DIKECILKAN DI MOBILE */}
            <tr className="text-base md:text-lg">
              <th className="py-3 px-3 md:px-4 w-12 text-center font-semibold bg-primary-600 text-white rounded-tl-lg">
                No
              </th>
              <th className="py-3 px-3 md:px-4 text-left font-semibold bg-primary-600 text-white border-l-2 md:border-l-4 border-secondary-500">
                Nama Pelanggaran
              </th>
              <th className="py-3 px-3 md:px-4 w-20 text-left font-semibold bg-primary-600 text-white border-l-2 md:border-l-4 border-secondary-500">
                Poin
              </th>
              <th className="py-3 px-3 md:px-4 text-left font-semibold bg-primary-600 text-white border-l-2 md:border-l-4 border-secondary-500 rounded-tr-lg">
                Keterangan
              </th>
            </tr>
          </thead>
          {/* UKURAN FONT BODY DIKECILKAN DI MOBILE */}
          <tbody className="text-base md:text-lg">
            {pelanggaran.length === 0 ? (
              // Tampilan yang lebih baik saat tidak ada data
              <tr className="bg-white shadow-sm">
                <td
                  colSpan={4}
                  className="py-4 px-4 md:px-6 text-center text-gray-500 italic rounded-lg"
                >
                  Tidak ada data pelanggaran
                </td>
              </tr>
            ) : (
              // Mapping data jika ada
              pelanggaran.map((item, index) => (
                <tr key={item.nama} className="bg-white shadow-sm">
                  <td className="py-3 px-3 md:px-4 text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3 px-3 md:px-4 font-medium border-l-2 md:border-l-4 border-secondary-500">
                    {item.nama}
                  </td>
                  <td className="py-3 px-3 md:px-4 text-left font-bold border-l-2 md:border-l-4 border-secondary-500">
                    {item.nilai}
                  </td>
                  <td className="py-3 px-3 md:px-4 font-medium capitalize border-l-2 md:border-l-4 border-secondary-500">
                    {item.kategori}
                  </td>
                </tr>
              ))
            )}

            {/* Baris total, hanya ditampilkan jika ada pelanggaran */}
            {/* Strukturnya sama seperti permintaan Anda sebelumnya untuk menjaga style sudut */}
            {pelanggaran.length > 0 && (
              <tr className="bg-white font-bold rounded-lg">
                <td className="py-3 px-3 md:px-4 rounded-bl-lg"></td>
                <td className="py-3 px-3 md:px-4 text-left border-l-2 md:border-l-4 border-secondary-500">
                  Total Poin Pelanggaran
                </td>
                <td className="py-3 px-3 md:px-4 text-left border-l-2 md:border-l-4 border-secondary-500">
                  {totalPoin > 0 ? totalPoin : "-"}
                </td>
                <td className="rounded-r-lg border-l-2 md:border-l-4 border-secondary-500"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
