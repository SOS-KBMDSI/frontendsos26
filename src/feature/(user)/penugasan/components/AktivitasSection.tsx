import { TaskCard } from "@/shared/components/ui/TaskCard";
import { Kuis, Tugas } from "../types";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/Button";
import { getIconForTask } from "../data/tugasIconData";

interface AktivitasSectionProps {
  tugas: Tugas[];
  kuis: Kuis[];
  activeTab: "tugas" | "kuis";
  onTabChange: (tab: "tugas" | "kuis") => void;
}

export const AktivitasSection = ({
  tugas,
  kuis,
  activeTab,
  onTabChange,
}: AktivitasSectionProps) => {
  return (
    <div className="w-full flex flex-col gap-8 md:gap-10">
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => onTabChange("tugas")}
          variant={activeTab === "tugas" ? "primary" : "outline"}
          className="font-semibold text-sm md:text-base px-10 md:px-14 rounded-2xl"
        >
          Tugas
        </Button>
        <Button
          onClick={() => onTabChange("kuis")}
          variant={activeTab === "kuis" ? "primary" : "outline"}
          className="font-semibold text-sm md:text-base px-10 md:px-14 rounded-2xl"
        >
          Kuis
        </Button>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 gap-x-1 gap-y-4",
          "lg:flex lg:flex-wrap lg:justify-around lg:gap-8",
        )}
      >
        {activeTab === "tugas" &&
          ((tugas || []).length > 0 ? (
            tugas.map((item) => {
              const Icon = getIconForTask(item.judul, "tugas");
              const deadlineDate = new Date(item.tenggat);
              const formattedDeadline = `${deadlineDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • ${deadlineDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`;

              return (
                <TaskCard
                  key={item.id_penugasan}
                  taskName={item.judul}
                  deadline={formattedDeadline}
                  icon={
                    <Icon className="w-12 h-12 md:w-16 md:h-16 text-default-light group-hover:text-primary-500" />
                  }
                />
              );
            })
          ) : (
            <p className="col-span-full text-center text-default-dark/70">
              Tugas sedang tidak ada, tunggu yaaa
            </p>
          ))}

        {activeTab === "kuis" &&
          ((kuis || []).length > 0 ? (
            kuis.map((item) => {
              const Icon = getIconForTask(item.nama_kuis, "kuis");
              const deadlineDate = new Date(item.tenggat_kuis);
              const formattedDeadline = `${deadlineDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • ${deadlineDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`;

              return (
                <TaskCard
                  key={item.id_kuis}
                  taskName={item.nama_kuis}
                  deadline={formattedDeadline}
                  icon={
                    <Icon className="w-12 h-12 md:w-16 md:h-16 text-default-light group-hover:text-primary-500" />
                  }
                />
              );
            })
          ) : (
            <p className="col-span-full text-center text-default-dark/70">
              Kuis sedang tidak ada, tunggu yaaa
            </p>
          ))}
      </div>
    </div>
  );
};
