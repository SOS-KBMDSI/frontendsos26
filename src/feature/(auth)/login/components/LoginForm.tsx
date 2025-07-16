import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import React from "react";

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
  error,
  handleSubmit,
}: LoginFormProps) {
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
              <Input
                size={"small"}
                id="password"
                type="password"
                placeholder="password siam"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="2xl:mt-12">
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

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
