import { cn } from "@/shared/utils/cn";

interface TaskStepperProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
}

export const TaskStepper = ({
  activeStep,
  setActiveStep,
}: TaskStepperProps) => {
  return (
    <div className="w-full max-w-[200px] md:max-w-[280px] mx-auto">
      <div className="relative">
        <div className="absolute top-6 md:top-7 left-0 right-0 mx-8 md:mx-10 h-1 -translate-y-1/2 z-0">
          <div className="w-full h-full bg-primary-200 rounded-full" />
          <div
            className="absolute top-0 left-0 h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: activeStep === 2 ? "100%" : "0%" }}
          />
        </div>

        <div className="relative flex justify-between items-start">
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => setActiveStep(1)}
          >
            <div
              className={cn(
                "w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-medium text-sm md:text-lg transition-colors z-10",
                activeStep === 1 ? "bg-primary-500" : "bg-primary-200",
              )}
            >
              1
            </div>
            <p
              className={cn(
                "font-medium transition-colors text-center text-xs md:text-base",
                activeStep === 1 ? "text-primary-500" : "text-primary-300",
              )}
            >
              Detail Tugas
            </p>
          </div>

          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => setActiveStep(2)}
          >
            <div
              className={cn(
                "w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-medium text-sm md:text-lg transition-colors z-10",
                activeStep === 2 ? "bg-primary-500" : "bg-primary-200",
              )}
            >
              2
            </div>
            <p
              className={cn(
                "font-medium transition-colors text-center text-xs md:text-base",
                activeStep === 2 ? "text-primary-500" : "text-primary-300",
              )}
            >
              Pengumpulan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
