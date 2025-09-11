import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authService } from "@/api/services/auth";
import { useToast } from "@/shared/hooks/useToast";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

export function useLoginForm() {
  const [emailornim, setEmailornim] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { showToast } = useToast();
  const { refetch } = useAuthContext();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ emailornim, password });

      showToast({
        type: "success",
        title: "Berhasil!",
        message: "Login berhasil! Selamat datang kembali.",
      });

      const redirectUrl = response.redirectUrl;
      await refetch();
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      let message = "Login gagal. Periksa kembali email dan password Anda.";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);

      showToast({
        type: "error",
        title: "Login Gagal!",
        message: message,
        duration: 10000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    emailornim,
    setEmailornim,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit,
  };
}
