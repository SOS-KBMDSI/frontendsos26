import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Tugas } from "@/feature/(user)/penugasan/types";
import { cn } from "@/shared/utils/cn";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import I from "@/assets/user/icon_i.svg";

interface DetailContentProps {
  activeStep: number;
  tugas: Tugas;
  driveLink: string;
  setDriveLink: (link: string) => void;
  isSubmitted: boolean;
  isOverdue: boolean;
  isSubmitting: boolean;
  handleFormSubmit: () => void;
  setActiveStep: (step: number) => void;
}

export const DetailContent = ({
  activeStep,
  tugas,
  driveLink,
  setDriveLink,
  // isSubmitted,
  isOverdue,
  isSubmitting,
  handleFormSubmit,
  setActiveStep,
}: DetailContentProps) => {
  const detailLink = tugas.file || "#";
  return (
    <div className="bg-primary-500/10 rounded-2xl py-8 px-6 md:py-12 md:px-16">
      <div className="grid grid-cols-1 grid-rows-1">
        {/* Konten Step 1 */}
        <div
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-300",
            activeStep === 1 ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <div className="flex flex-col items-center gap-8 h-full">
            <div className="w-full flex-grow">
              <div
                className="prose max-w-none whitespace-pre-line text-default-dark text-left text-base"
                dangerouslySetInnerHTML={{ __html: tugas.deskripsi }}
              />
              <div className="mt-6 flex justify-center md:justify-start">
                <Button
                  variant="outline"
                  onClick={() => window.open(detailLink, "_blank")}
                >
                  <LinkIcon className="mr-2" size={20} />
                  Lihat Detail Tugas
                </Button>
              </div>
            </div>
            <Button
              onClick={() => setActiveStep(2)}
              className="w-full md:w-auto px-16"
            >
              Lanjut
            </Button>
          </div>
        </div>

        {/* Konten Step 2 */}
        <div
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-300",
            activeStep === 2 ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <div className="flex flex-col gap-6 h-full">
            <div className="flex-grow">
              <h2 className="text-xl md:text-2xl font-semibold text-primary-500 mb-6">
                Kumpulkan Tugas Kamu
              </h2>
              <div className="w-full flex flex-col items-start gap-4">
                <div className="w-full flex flex-col gap-2 md:gap-4">
                  <label
                    htmlFor="drive_link"
                    className="text-default-dark text-base md:text-lg"
                  >
                    Link Penugasan
                  </label>
                  <Input
                    id="drive_link"
                    placeholder="Masukkan Link Tugas Penugasan mu di sini..."
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    disabled={isOverdue || isSubmitting}
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center text-justify gap-3 bg-infoNotif border border-borderNotif p-4 md:p-5 rounded-lg w-full mt-4 md:mt-6">
                  <div className="rounded-full bg-borderNotif p-3 flex items-center justify-center">
                    <Image src={I} alt="Icon I" width={32} height={32} />
                  </div>
                  <p className="text-sm md:text-lg text-default-dark">
                    Agar tugas kamu bisa kami periksa, mohon atur akses link ke
                    Siapa saja yang memiliki link <i>(Anyone with the link)</i>{" "}
                    sebagai Pelihat <i>(Viewer)</i>. Hindari pengaturan Dibatasi{" "}
                    <i>(Restricted)</i>.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full justify-center mt-4">
              <Button
                variant="outline"
                onClick={() => setActiveStep(1)}
                className="w-full md:w-auto px-12"
              >
                Sebelumnya
              </Button>
              <Button
                onClick={handleFormSubmit}
                disabled={isOverdue || isSubmitting}
                className="w-full md:w-auto px-20"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Kirim
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
