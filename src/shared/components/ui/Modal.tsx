"use client";

import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  desc?: string;
  children: ReactNode;
  containerClassName?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  desc,
  children,
  containerClassName,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Content
              className={cn(
                "relative w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all",
                containerClassName,
              )}
            >
              {title && (
                <Dialog.Title className="text-2xl font-bold leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
              )}

              {desc && <p className="mt-2 text-sm text-gray-500">{desc}</p>}

              {!title && !desc && (
                <VisuallyHidden.Root asChild>
                  <Dialog.Title>Modal Window</Dialog.Title>
                </VisuallyHidden.Root>
              )}

              <Dialog.Close className="absolute top-10 right-14 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Dialog.Close>

              <div className={cn(title && "mt-4")}>{children}</div>
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { Modal };
