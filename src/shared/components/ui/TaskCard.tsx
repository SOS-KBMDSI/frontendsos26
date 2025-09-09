"use client";

import React, { forwardRef, ReactElement } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const taskCardVariants = cva(
  "group flex w-full flex-col items-center gap-3 py-6 px-3 text-center transition-colors duration-200 md:max-w-xs md:gap-10 md:py-10 md:px-8 rounded-xl",
  {
    variants: {
      status: {
        default:
          "bg-transparent hover:bg-primary-500 active:bg-primary-600 hover:cursor-pointer",
        completed:
          "bg-transparent hover:bg-default-dark/20 active:bg-default-dark/50 hover:cursor-pointer",
        overdue:
          "bg-transparent hover:bg-primary-300 active:bg-primary-400 hover:cursor-pointer",
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

export type TaskStatus = "default" | "completed" | "overdue";

export interface TaskCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof taskCardVariants> {
  icon?: ReactElement;
  taskName: string;
  deadline: string;
  status?: TaskStatus;
}

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  (
    { className, icon = <X size={96} />, taskName, deadline, status, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(taskCardVariants({ status }), className)}
        {...props}
      >
        <div className="relative flex h-[106px] w-[106px] items-center justify-center md:h-[150px] md:w-[150px]">
          <div
            className={cn(
              "absolute h-full w-full rounded-full transition-colors duration-200",
              status === "default" &&
                "bg-primary-500 group-hover:bg-default-light",
              status === "completed" &&
                "bg-default-dark/20 group-hover:bg-default-light",
              status === "overdue" &&
                "bg-primary-400 group-hover:bg-default-light",
            )}
          />
          <div
            className={cn(
              "absolute flex h-[85%] w-[85%] items-center justify-center rounded-full border-[6px] transition-colors duration-200",
              status === "default" &&
                "border-default-light group-hover:border-primary-500 active:border-primary-600",
              status === "completed" &&
                "border-default-light group-hover:border-default-dark/20 active:border-default-dark/50",
              status === "overdue" &&
                "border-default-light group-hover:border-primary-300 active:border-primary-400",
              status === "default" &&
                "bg-primary-500 group-hover:bg-default-light",
              status === "completed" &&
                "bg-default-dark/20 group-hover:bg-default-light",
              status === "overdue" &&
                "bg-primary-400 group-hover:bg-default-light",
            )}
          >
            {React.cloneElement(icon, {
              className: cn(
                "w-12 h-12 md:w-16 md:h-16 transition-colors",
                status === "default" &&
                  "text-default-light group-hover:text-primary-500 active:text-primary-600",
                status === "completed" &&
                  "text-default-light group-hover:text-default-dark/20 active:text-default-dark/50",
                status === "overdue" &&
                  "text-default-light group-hover:text-primary-300 active:text-primary-400",
              ),
            })}
          </div>
        </div>

        <div className={cn("flex flex-col gap-3", "md:gap-5")}>
          <h3
            className={cn(
              "text-sm font-semibold md:text-2xl transition-colors",
              "text-default-dark group-hover:text-default-light",
            )}
          >
            {taskName}
          </h3>

          <div
            className={cn(
              "text-[10px] md:text-sm transition-colors",
              "text-default-dark group-hover:text-default-light",
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
