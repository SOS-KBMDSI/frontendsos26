import { useFormCreateTugas } from "../hooks/useFormCreateTugas";

interface UseFormCreateTugasHandlersProps {
  onSuccess: () => void;
  onError: (message?: string) => void;
}

interface FormCreateTugasHandlers {
  handleJudulChange: (value: string) => void;
  handleDeskripsiChange: (value: string) => void;
  handleTenggatChange: (value: string) => void;
  handleFileLinkChange: (value: string) => void;
  handleRangkaianChange: (value: string) => void;
  handleFormSubmit: (e: React.FormEvent) => Promise<void>;
}

export const HndleFormCreateTugas = ({
  onSuccess,
  onError,
}: UseFormCreateTugasHandlersProps): FormCreateTugasHandlers => {
  const {
    setJudul,
    setDeskripsi,
    setTenggat,
    setFileLink,
    setIdRangkaian,
    feedback,
    handleSubmit,
  } = useFormCreateTugas({
    onSuccess,
  });

  const handleJudulChange = (value: string) => {
    setJudul(value);
  };

  const handleDeskripsiChange = (value: string) => {
    setDeskripsi(value);
  };

  const handleTenggatChange = (value: string) => {
    setTenggat(value);
  };

  const handleFileLinkChange = (value: string) => {
    setFileLink(value);
  };

  const handleRangkaianChange = (value: string) => {
    setIdRangkaian(value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
    } catch {
      onError(feedback?.message || "Terjadi kesalahan saat menyimpan tugas");
    }
  };

  return {
    handleJudulChange,
    handleDeskripsiChange,
    handleTenggatChange,
    handleFileLinkChange,
    handleRangkaianChange,
    handleFormSubmit,
  };
};
