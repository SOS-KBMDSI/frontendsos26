import { PenilaianItem } from "../types";
import { useMemo } from "react";

interface TabelDetailPenilaianProps {
  penilaian: PenilaianItem[];
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
      <h2 className="text-lg md:text-2xl font-bold text-default-dark mb-4">
        Detail Penilaian
      </h2>
      <div className="w-full">
        <table
          className="w-full border-separate"
          style={{ borderSpacing: "0 0.5rem" }}
        >
          <thead>
            <tr className="text-base md:text-lg">
              <th className="py-3 px-3 md:px-4 w-12 text-center font-semibold bg-primary-600 text-white rounded-tl-xl">
                No
              </th>
              <th className="py-3 px-3 md:px-4 text-left font-semibold bg-primary-600 text-white border-l-2 md:border-l-4 border-secondary-500">
                Nama Penilaian
              </th>
              <th className="py-3 px-3 md:px-4 w-24 text-left font-semibold bg-primary-600 text-white border-l-2 md:border-l-4 border-secondary-500 rounded-tr-xl">
                Nilai
              </th>
            </tr>
          </thead>
          <tbody className="text-base md:text-lg">
            {penilaian.map((item, index) => (
              <tr key={item.nama_penilaian} className="bg-white shadow-sm">
                <td className="py-3 px-3 md:px-4 text-center font-medium">
                  {index + 1}
                </td>
                <td className="py-3 px-3 md:px-4 font-medium border-l-2 md:border-l-4 border-secondary-500">
                  {item.nama_penilaian}
                </td>
                <td className="py-3 px-3 md:px-4 text-left font-bold border-l-2 md:border-l-4 border-secondary-500">
                  {item.nilai !== null ? item.nilai : "-"}
                </td>
              </tr>
            ))}

            {specialRows.map(
              (row, index) =>
                row.show && (
                  <tr key={row.nama} className="bg-white shadow-sm">
                    <td className="py-3 px-3 md:px-4 text-center font-medium">
                      {penilaian.length + index + 1}
                    </td>
                    <td className="py-3 px-3 md:px-4 font-medium border-l-2 md:border-l-4 border-secondary-500">
                      {row.nama}
                    </td>
                    <td className="py-3 px-3 md:px-4 text-left font-bold border-l-2 md:border-l-4 border-secondary-500">
                      {row.nilai}
                    </td>
                  </tr>
                ),
            )}

            <tr className="bg-white font-bold rounded-xl">
              <td className="py-3 px-3 md:px-4 rounded-bl-xl"></td>
              <td className="py-3 px-3 md:px-4 text-left border-l-2 md:border-l-4 border-secondary-500">
                Rata-rata Nilai
              </td>
              <td className="py-4 px-7 text-left border-l-4 border-secondary-500 rounded-br-xl md:rounded-br-lg">
                {rataRata}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
