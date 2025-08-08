import React, { forwardRef, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export interface TaskCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  taskName: string;
  deadline: string;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  (
    {
      className,
      icon = (
        <X
          size={96}
          className="text-default-light group-hover:text-primary-500 group-active:text-primary-600"
        />
      ),
      taskName,
      deadline,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group flex w-full flex-col items-center gap-3 rounded-xl py-6 px-3 text-center transition-colors duration-300",
          "md:max-w-xs md:gap-10 md:py-10 md:px-8 hover:cursor-pointer",
          "hover:bg-primary-500 active:bg-primary-600",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "relative flex h-[106px] w-[106px] items-center justify-center",
            "md:h-[150px] md:w-[150px]",
          )}
        >
          <div className="absolute h-full w-full rounded-full bg-primary-500 group-hover:bg-white transition-colors duration-300" />
          <div className="absolute flex h-[85%] w-[85%] items-center justify-center rounded-full border-[6px] border-white bg-primary-500 group-hover:bg-white group-hover:border-primary-500 group-active:border-primary-600 transition-colors duration-300">
            {icon}
          </div>
        </div>

        <div className={cn("flex flex-col gap-3 h-26", "md:gap-5 md:h-28")}>
          <h3
            className={cn(
              "text-sm font-semibold text-default-dark group-hover:text-default-light",
              "md:text-2xl",
            )}
          >
            {taskName}
          </h3>

          <div
            className={cn(
              "text-default-dark group-hover:text-default-light text-[10px]",
              "md:text-sm",
            )}
          >
            <p>Deadline:</p>
            <p>{deadline}</p>
          </div>
        </div>
      </div>
    );
  },
);
TaskCard.displayName = "TaskCard";

export { TaskCard };
