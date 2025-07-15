"use client";
import React from "react";
import { AuthProfile, EditProfileRequest } from "@/api/services/auth";
import { Input } from "@/shared/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Textarea } from "@/shared/components/ui/Textarea";

interface ProfileFormProps {
  user: AuthProfile | null;
  isEditing: boolean;
  formData: EditProfileRequest;
  onFormChange: (name: keyof EditProfileRequest, value: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  isEditing,
  formData,
  onFormChange,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onFormChange(e.target.name as keyof EditProfileRequest, e.target.value);
  };

  const handleGolonganDarahChange = (newValue: string) => {
    onFormChange("GolonganDarah", newValue);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg md:px-20 md:py-16 px-6 py-8 mt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-black transition-colors duration-300">
            {isEditing ? "Edit Identitas" : "Identitas"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Nama lengkap
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed text-sm md:text-base">
              {user?.nama || "-"}
            </p>
          </div>
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              NIM
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed text-sm md:text-base">
              {user?.nim || "-"}
            </p>
          </div>
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Email
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed text-sm md:text-base">
              {user?.email || "-"}
            </p>
          </div>
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Jenis kelamin
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed text-sm md:text-base">
              {user?.kelamin || "-"}
            </p>
          </div>
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Nomor Telepon
            </label>
            {isEditing ? (
              <Input
                type="tel"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                placeholder="Masukkan nomor telepon"
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 text-sm md:text-base">
                {user?.telp || "-"}
              </p>
            )}
          </div>
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              ID Line
            </label>
            {isEditing ? (
              <Input
                type="text"
                name="Line"
                value={formData.Line}
                onChange={handleInputChange}
                placeholder="Masukkan ID Line"
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 text-sm md:text-base">
                {user?.line || "-"}
              </p>
            )}
          </div>
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Agama
            </label>
            {isEditing ? (
              <Input
                type="text"
                name="Agama"
                value={formData.Agama}
                onChange={handleInputChange}
                placeholder="Masukkan agama"
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 text-sm md:text-base">
                {user?.agama || "-"}
              </p>
            )}
          </div>
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Golongan Darah
            </label>
            {isEditing ? (
              <Select
                value={formData.GolonganDarah || ""}
                onValueChange={handleGolonganDarahChange}
              >
                <SelectTrigger className="w-full h-10 transition-all duration-300 ease-in-out hover:border-primary-500 text-sm md:text-base">
                  <SelectValue placeholder="Pilih Golongan Darah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="AB">AB</SelectItem>
                  <SelectItem value="O">O</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 text-sm md:text-base">
                {user?.golongan_darah || "-"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg md:px-20 md:py-16 px-6 py-8 mt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-black transition-colors duration-300">
            Informasi Kesehatan
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col md:col-span-2 transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Riwayat Penyakit
            </label>
            {isEditing ? (
              <Textarea
                name="RiwayatPenyakit"
                value={formData.RiwayatPenyakit}
                onChange={handleInputChange}
                placeholder="Masukkan riwayat penyakit (jika ada)"
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 min-h-[40px] text-sm md:text-base">
                {user?.riwayat_penyakit || "-"}
              </p>
            )}
          </div>
          <div className="flex flex-col md:col-span-2 transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Alergi Obat
            </label>
            {isEditing ? (
              <Textarea
                name="AlergiObat"
                value={formData.AlergiObat}
                onChange={handleInputChange}
                placeholder="Masukkan alergi obat (jika ada)"
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 min-h-[40px] text-sm md:text-base">
                {user?.alergi_obat || "-"}
              </p>
            )}
          </div>
          <div className="flex flex-col md:col-span-2 transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Alergi Makanan
            </label>
            {isEditing ? (
              <Textarea
                name="AlergiMakanan"
                value={formData.AlergiMakanan}
                onChange={handleInputChange}
                placeholder="Masukkan alergi makanan (jika ada)"
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
              />
            ) : (
              <p className="px-3 py-2 bg-gray-50 rounded-lg text-gray-700 min-h-[40px] text-sm md:text-base">
                {user?.alergi_makanan || "-"}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg md:px-20 md:py-16 px-6 py-8 mt-8 transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-black transition-colors duration-300">
            Detail Kelompok
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Nama Distrik
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed text-sm md:text-base">
              {/* Asumsi: nama distrik ada di user.kelompok.distrik.nama_distrik */}
              {user?.kelompok?.distrik?.nama_distrik || "-"}
            </p>
          </div>
          <div className="flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
            <label className="text-primary-500 text-base md:text-lg mb-1 font-semibold">
              Nama Kelompok
            </label>
            <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed text-sm md:text-base">
              {user?.kelompok?.nama_kelompok || "-"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
