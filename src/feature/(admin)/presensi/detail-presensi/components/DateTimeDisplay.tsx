import { Calendar, Clock } from "lucide-react";
import React from "react";

interface DateTimeDisplayProps {
  variant: "date" | "clock";
  value: string; // "18-09-2025" or "23 : 59"
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({
  variant,
  value,
}) => {
  if (variant === "date") {
    const dateParts = value.split("-");
    return (
      <div className="flex items-center gap-x-1 text-base text-default-dark">
        <Calendar size={24} />
        {dateParts.length === 3 ? (
          <div className="flex gap-x-1">
            <p>{dateParts[0]}</p>
            <span>/</span>
            <p>{dateParts[1]}</p>
            <span>/</span>
            <p>{dateParts[2]}</p>
          </div>
        ) : (
          <p>{value}</p>
        )}
      </div>
    );
  }

  if (variant === "clock") {
    return (
      <div className="flex items-center gap-x-1 text-base text-default-dark">
        <Clock size={24} />
        <p>{value}</p>
      </div>
    );
  }

  return null;
};

export default DateTimeDisplay;
