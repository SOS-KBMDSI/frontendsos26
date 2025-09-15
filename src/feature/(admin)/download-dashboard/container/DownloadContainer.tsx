"use client";
import React, { useState } from "react";
import {
  Download,
  FileText,
  BarChart3,
  Users,
  AlertCircle,
  CheckCircle2,
  Loader2,
  LucideIcon,
} from "lucide-react";
import useDownload from "../hooks/useDownload";
import FileNameModal from "../components/FileNameModal";

type DownloadType = "penilaian" | "penugasan" | "mahasiswa";

interface DownloadCard {
  id: DownloadType;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  defaultFilename?: string;
}

const DownloadContainer = () => {
  const downloadCards: DownloadCard[] = [
    {
      id: "penugasan",
      title: "Penugasan",
      description: "Download data penugasan siswa",
      icon: FileText,
      color: "from-primary-500 to-primary-700",
      hoverColor: "hover:from-primary-600 hover:to-primary-800",
    },
    {
      id: "penilaian",
      title: "Penilaian",
      description: "Download laporan penilaian",
      icon: BarChart3,
      color: "from-primary-500 to-primary-700",
      hoverColor: "hover:from-secondary-700 hover:to-secondary-900",
    },
    {
      id: "mahasiswa",
      title: "Mahasiswa",
      description: "Download data kehadiran",
      icon: Users,
      color: "from-primary-400 to-primary-600",
      hoverColor: "hover:from-primary-500 hover:to-primary-700",
    },
  ];

  const DownloadCard = ({ card }: { card: DownloadCard }) => {
    const { isLoading, error, download } = useDownload(card.id);
    const [success, setSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
      if (!isLoading) {
        setIsModalOpen(true);
      }
    };

    const handleConfirmDownload = async (customFilename: string) => {
      try {
        await download(customFilename);
        setSuccess(true);
        setIsModalOpen(false);
        setTimeout(() => setSuccess(false), 3000);
      } catch {}
    };

    const IconComponent = card.icon;

    return (
      <>
        <div
          key={card.id}
          className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border overflow-hidden ${
            error
              ? "border-red-300"
              : success
                ? "border-green-300"
                : "border-surface-divider"
          }`}
          onClick={handleCardClick}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.color} ${card.hoverColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          />

          {/* Card content */}
          <div className="relative p-6 flex flex-col items-center text-center space-y-4">
            {/* Icon container */}
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                card.color
              } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : success ? (
                <CheckCircle2 className="w-8 h-8 text-white" />
              ) : error ? (
                <AlertCircle className="w-8 h-8 text-white" />
              ) : (
                <IconComponent className="w-8 h-8 text-white" />
              )}
            </div>

            <h3
              className={`text-xl font-semibold font-poppins transition-colors duration-300 ${
                error
                  ? "text-red-600"
                  : success
                    ? "text-green-600"
                    : "text-default-dark group-hover:text-primary-600"
              }`}
            >
              {card.title}
            </h3>

            <p className="text-sm text-default-dark-50 font-poppins leading-relaxed">
              {card.description}
            </p>

            <div
              className={`flex items-center space-x-2 transition-colors duration-300 mt-4 ${
                error
                  ? "text-red-500"
                  : success
                    ? "text-green-500"
                    : "text-primary-500 group-hover:text-primary-600"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium font-poppins">
                    Downloading...
                  </span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium font-poppins">
                    Downloaded!
                  </span>
                </>
              ) : error ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium font-poppins">
                    Failed
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium font-poppins">
                    Download
                  </span>
                </>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Hover effect border */}
          <div
            className={`absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300 ${
              error
                ? "group-hover:border-red-200"
                : success
                  ? "group-hover:border-green-200"
                  : "group-hover:border-primary-200"
            }`}
          />
        </div>
        <FileNameModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleConfirmDownload}
          defaultFileName={card.defaultFilename || ""}
          isLoading={isLoading}
          title={card.title}
        />
      </>
    );
  };

  return (
    <div className="mycontainer py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-default-dark mb-2 font-poppins">
          Download Data
        </h2>
        <p className="text-default-dark-50 font-poppins">
          Pilih jenis data yang ingin Anda download
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloadCards.map((card) => (
          <DownloadCard key={card.id} card={card} />
        ))}
      </div>

      {/* Additional info section */}
      <div className="mt-12 bg-secondary-100 rounded-xl p-6 border border-secondary-300">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0 mt-1">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-default-dark font-poppins mb-2">
              Informasi Download
            </h4>
            <ul className="text-sm text-default-dark font-poppins space-y-1">
              <li>• File akan didownload dalam format Excel (.xlsx)</li>
              <li>• Pastikan koneksi internet stabil saat download</li>
              <li>• Klik pada kartu untuk memulai download</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadContainer;
