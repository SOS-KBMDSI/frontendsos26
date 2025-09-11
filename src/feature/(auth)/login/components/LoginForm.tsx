import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import React, { useState } from "react"; // 1. Impor useState
import { Eye, EyeOff } from "lucide-react"; // Contoh menggunakan ikon dari lucide-react

interface LoginFormProps {
  emailornim: string;
  setEmailornim: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  handleSubmit: (event: React.FormEvent) => void;
}

export default function LoginForm({
  emailornim,
  setEmailornim,
  password,
  setPassword,
  isLoading,
  handleSubmit,
}: LoginFormProps) {
  // 2. Tambahkan state untuk visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto z-20 h-fit w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl rounded-3xl bg-white shadow-lg">
      <div className="px-6 py-12 lg:p-14">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-8 mb-8">
            <div className="flex flex-col space-y-1.5">
              <label
                className="text-sm font-medium text-primary-500"
                htmlFor="emailornim"
              >
                Email atau NIM
              </label>
              <Input
                size={"small"}
                id="emailornim"
                type="text"
                placeholder="email atau NIM "
                value={emailornim}
                onChange={(e) => setEmailornim(e.target.value)}
                required
                variant={"default"}
                state={"default"}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label
                className="text-sm font-medium text-primary-500"
                htmlFor="password"
              >
                Kata Sandi
              </label>
              {/* 3. Bungkus Input dengan div relative */}
              <div className="relative">
                <Input
                  size={"small"}
                  id="password"
                  // 4. Jadikan tipe input dinamis
                  type={showPassword ? "text" : "password"}
                  placeholder="password siam"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  // Tambahkan padding kanan agar teks tidak tertutup ikon
                  className="pr-10"
                />
                {/* 5. Tambahkan tombol untuk toggle visibilitas */}
                <button
                  type="button" // Penting agar tidak submit form
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="2xl:mt-12">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-sm"
            >
              {isLoading ? "Memproses..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
