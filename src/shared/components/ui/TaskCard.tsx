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
          "group flex w-full max-w-xs flex-col items-center gap-10 rounded-xl py-12 px-10 text-center transition-colors duration-300",
          "hover:bg-primary-500 active:bg-primary-600",
          className,
        )}
        {...props}
      >
        <div className="relative flex h-[200px] w-[200px] items-center justify-center">
          <div className="absolute h-full w-full rounded-full bg-primary-500 group-hover:bg-white transition-colors duration-300" />
          <div className="absolute flex h-[85%] w-[85%] items-center justify-center rounded-full border-[6px] border-white bg-primary-500 group-hover:bg-white group-hover:border-primary-500 group-active:border-primary-600 transition-colors duration-300">
            {icon}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-3xl font-semibold text-default-dark group-hover:text-taskCard">
            {taskName}
          </h3>
          <p className="text-default-dark group-hover:text-taskCard">
            {deadline}
          </p>
        </div>
      </div>
    );
  },
);
TaskCard.displayName = "TaskCard";

export { TaskCard };
