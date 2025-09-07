import { useState, useEffect, useCallback } from "react";
import { countdownService, CountdownData } from "@/api/services/user/countdown";

interface UseCountdownHook {
  data: CountdownData | null;
  eventName: string;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isLoading: boolean;
  error: string | null;
}

export const useGetCountdown = (): UseCountdownHook => {
  const [data, setData] = useState<CountdownData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [eventName, setEventName] = useState<string>("Loading Event...");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await countdownService.getCountdownData();
      if (response.status_code === 200 && response.data.is_active) {
        setData(response.data);
        setEventName(response.data.nama);
      } else {
        setEventName("Belum ada rangkaian");
        setData(null);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memuat data.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!data || !data.is_active) return;

    const targetDate = new Date(data.tanggal);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  return {
    data,
    eventName,
    timeLeft,
    isLoading,
    error,
  };
};
