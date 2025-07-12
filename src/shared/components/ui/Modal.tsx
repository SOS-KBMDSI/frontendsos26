"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc?: string;
  children: ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  desc,
  children,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-white px-8 py-6 shadow-xl"
      >
        <div className="w-full flex justify-end my-2">
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex  flex-col items-center justify-center border-gray-200 pb-4">
          <h3 className="text-2xl font-semibold text-default-dark">{title}</h3>
          <p className="text-base text-default-dark-50">{desc}</p>
        </div>

        <div className="mt-4 max-h-[70vh] overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
};
