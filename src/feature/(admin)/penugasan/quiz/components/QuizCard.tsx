import { Quiz } from "@/api/services/admin/quiz";
import { Ellipsis } from "lucide-react";
import React from "react";
interface QuizCardProps {
  quiz: Quiz;
  idx: number;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, idx }) => {
  return (
    <div className="bg-gray-200/50 hover:cursor-pointer  flex justify-between rounded-lg p-4">
      <div className="text-xl text-black">
        Tugas {idx} : ({quiz.nama_kuis})
      </div>
      <div>
        <Ellipsis className="rotate-90" />
      </div>
    </div>
  );
};
