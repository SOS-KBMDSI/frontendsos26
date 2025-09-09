import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "./Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, state, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          inputVariants({ variant, size, state }),
          "min-h-[120px] py-3",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
