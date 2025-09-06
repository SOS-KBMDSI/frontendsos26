import { PenilaianItem, PelanggaranItem } from "../types";
import { useMemo } from "react";

interface TabelDetailPenilaianProps {
  penilaian: PenilaianItem[];
  pelanggaran: PelanggaranItem[];
  keaktifan: number;
  activeRangkaianName: string | null;
}

export const TabelDetailPenilaian = ({
  penilaian,
  keaktifan,
  activeRangkaianName,
}: TabelDetailPenilaianProps) => {
  const isKeaktifanIncluded = !activeRangkaianName
    ?.toLowerCase()
    .includes("pra");

  const { rataRata } = useMemo(() => {
    const nilaiUntukRataRata = [...penilaian.map((p) => p.nilai)];
    if (isKeaktifanIncluded) {
      nilaiUntukRataRata.push(keaktifan);
    }

    const totalNilai = nilaiUntukRataRata.reduce(
      (sum, nilai) => sum + nilai,
      0,
    );
    const rataRata =
      nilaiUntukRataRata.length > 0
        ? (totalNilai / nilaiUntukRataRata.length).toFixed(2)
        : "-";

    return { rataRata };
  }, [penilaian, keaktifan, isKeaktifanIncluded]);

  const specialRows = [
    {
      nama: "Keaktifan",
      nilai: keaktifan,
      show: isKeaktifanIncluded,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-default-dark mb-4">
        Detail Penilaian
      </h2>
      <div className="overflow-x-auto">
        <table
          className="w-full border-separate whitespace-nowrap"
          style={{ borderSpacing: "0 0.75rem" }}
        >
          <thead>
            <tr className="text-xl">
              <th className="py-4 px-4 md:px-6 w-16 text-center font-semibold bg-primary-600 text-white rounded-tl-xl md:rounded-tl-lg">
                No
              </th>
              <th className="py-4 px-4 md:px-6 text-left font-semibold bg-primary-600 text-white border-l-4 border-secondary-500">
                Nama Penilaian
              </th>
              <th className="py-4 px-7 w-72 text-left font-semibold bg-primary-600 text-white border-l-4 border-secondary-500 rounded-tr-xl md:rounded-tr-lg">
                Nilai
              </th>
            </tr>
          </thead>
          <tbody className="text-xl">
            {penilaian.map((item, index) => (
              <tr key={item.nama_penilaian} className="bg-white shadow-sm">
                <td className="py-4 px-4 md:px-6 text-center font-medium">
                  {index + 1}
                </td>
                <td className="py-4 px-6 font-medium border-l-4 border-secondary-500">
                  {item.nama_penilaian}
                </td>
                <td className="py-4 px-6 text-left font-bold border-l-4 border-secondary-500">
                  {item.nilai !== null ? item.nilai : "-"}
                </td>
              </tr>
            ))}

            {specialRows.map(
              (row, index) =>
                row.show && (
                  <tr key={row.nama} className="bg-white shadow-sm">
                    <td className="py-4 px-4 md:px-6 text-center font-medium">
                      {penilaian.length + index + 1}
                    </td>
                    <td className="py-4 px-7 font-medium border-l-4 border-secondary-500">
                      {row.nama}
                    </td>
                    <td className="py-4 px-7 text-left font-bold border-l-4 border-secondary-500">
                      {row.nilai}
                    </td>
                  </tr>
                ),
            )}

            <tr className="bg-white font-bold rounded-lg">
              <td className="py-4 px-7 text-left rounded-bl-xl md:rounded-bl-lg"></td>
              <td className="py-4 px-7 text-left border-l-4 border-secondary-500">
                Rata-rata Nilai
              </td>
              <td className="py-4 px-7 text-left border-l-4 border-secondary-500 rounded-tr-xl md:rounded-tr-lg">
                {rataRata}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
