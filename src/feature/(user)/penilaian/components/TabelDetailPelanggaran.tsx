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
      <h2 className="text-2xl md:text-3xl font-bold text-default-dark mb-4">
        Detail Pelanggaran
      </h2>
      <div className="overflow-x-auto">
        <table
          className="w-full border-separate whitespace-nowrap"
          style={{ borderSpacing: "0 0.75rem" }}
        >
          <thead>
            <tr className="text-xl">
              <th className="py-4 px-7 md:px-6 w-16 text-center font-semibold bg-primary-600 text-white rounded-tl-xl md:rounded-tl-lg">
                No
              </th>
              <th className="py-4 px-7 md:px-6 text-left font-semibold bg-primary-600 text-white border-l-4 border-secondary-500">
                Nama Pelanggaran
              </th>
              <th className="py-4 px-7 w-40 text-left font-semibold bg-primary-600 text-white border-l-4 border-secondary-500">
                Nilai
              </th>
              <th className="py-4 px-7 w-72 text-left font-semibold bg-primary-600 text-white border-l-4 border-secondary-500 rounded-tr-xl md:rounded-tr-lg">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {pelanggaran.length === 0 && (
              <tr className="bg-white shadow-sm">
                <td className="py-4 px-4 md:px-6 text-center font-medium">1</td>
                <td className="py-4 px-6 font-medium border-l-4 border-secondary-500">
                  -
                </td>
                <td className="py-4 px-6 text-left font-bold border-l-4 border-secondary-500">
                  -
                </td>
                <td className="py-4 px-6 font-medium capitalize border-l-4 border-secondary-500">
                  -
                </td>
              </tr>
            )}

            {pelanggaran.map((item, index) => (
              <tr key={item.nama} className="bg-white shadow-sm">
                <td className="py-4 px-4 md:px-6 text-center font-medium">
                  {index + 1}
                </td>
                <td className="py-4 px-6 font-medium border-l-4 border-secondary-500">
                  {item.nama}
                </td>
                <td className="py-4 px-6 text-left font-bold border-l-4 border-secondary-500">
                  {item.nilai}
                </td>
                <td className="py-4 px-6 font-medium capitalize border-l-4 border-secondary-500">
                  {item.kategori}
                </td>
              </tr>
            ))}

            <tr className="bg-white font-bold rounded-lg">
              <td className="py-4 px-7 text-left rounded-bl-xl md:rounded-bl-lg">
                {" "}
              </td>
              <td className="py-4 px-7 text-left border-l-4 border-secondary-500">
                Total Poin Pelanggaran
              </td>
              <td className="py-4 px-7 text-left border-l-4 border-secondary-500">
                {totalPoin > 0 ? totalPoin : "-"}
              </td>
              <td className="rounded-br-xl md:rounded-br-lg"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
