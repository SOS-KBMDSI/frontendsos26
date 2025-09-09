import React, { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { QuizView } from "../components/QuizView";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useGetDetailQuiz } from "../hooks/useGetQuiz";
import { useRouter } from "next/navigation";

const QuizStartContainer = ({ id_kuis }: { id_kuis: string }) => {
  const { modalContent, closeModal, ...quizProps } = useQuiz({ id_kuis });
  const { data: dataQuiz } = useGetDetailQuiz(id_kuis);
  const router = useRouter();

  useEffect(() => {
    if (dataQuiz?.status_kuis === "Selesai") {
      router.push(`/aktivitas/kuis/${id_kuis}`);
    }
  }, [dataQuiz?.status_kuis, id_kuis, router]);
  return (
    <section className="bg-login ">
      <QuizView {...quizProps} />;
      {modalContent?.isOpen && (
        <ConfirmationModal
          isOpen={modalContent.isOpen}
          onClose={closeModal}
          onConfirm={modalContent.onConfirm}
          isLoading={quizProps.isSubmitting}
          title={modalContent.title}
          message={modalContent.message}
          confirmText={modalContent.confirmText}
          hideCancelButton={modalContent.hideCancelButton}
        />
      )}
    </section>
  );
};

export default QuizStartContainer;
