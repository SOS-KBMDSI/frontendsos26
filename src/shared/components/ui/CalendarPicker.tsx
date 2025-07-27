import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarPickerProps {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  disabled: boolean;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("23:59");
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setCurrentDate(date);
      setSelectedTime(
        `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
      );
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr) return "Pilih tanggal";
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day: number): void => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const [hours, minutes] = selectedTime.split(":");
    newDate.setHours(parseInt(hours), parseInt(minutes));

    const formatted = newDate.toISOString().slice(0, 16);
    onChange({ target: { value: formatted } });
    setIsOpen(false);
  };

  const handleTimeChange = (time: string): void => {
    setSelectedTime(time);
    if (value) {
      const date = new Date(value);
      const [hours, minutes] = time.split(":");
      date.setHours(parseInt(hours), parseInt(minutes));

      const formatted = date.toISOString().slice(0, 16);
      onChange({ target: { value: formatted } });
    }
  };

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    const selectedDate = value ? new Date(value) : null;

    const days: React.ReactElement[] = [];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-6 h-6"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;
      const isPast =
        new Date(year, month, day) <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={isPast}
          className={`w-6 h-6 text-xs rounded transition-all flex items-center justify-center ${
            isSelected
              ? "bg-indigo-600 text-white"
              : isToday
                ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                : isPast
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>,
      );
    }

    return (
      <div className="p-2 border absolute -top-[24rem] bg-white left-1/2 transform -translate-x-1/2 rounded-lg shadow-lg w-52">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={12} />
          </button>
          <h3 className="text-xs font-medium">
            {monthNames[month]} {year}
          </h3>
          <button
            type="button"
            onClick={() => navigateMonth(1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((day, index) => (
            <div key={index} className="text-xs text-gray-500 text-center py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">{days}</div>

        {/* Time picker */}
        <div className="border-t pt-2">
          <div className="flex items-center gap-1 mb-1">
            <Clock size={10} />
            <span className="text-xs text-gray-600">Waktu</span>
          </div>
          <div className="flex gap-1">
            <select
              value={selectedTime.split(":")[0]}
              onChange={(e) =>
                handleTimeChange(
                  `${e.target.value}:${selectedTime.split(":")[1]}`,
                )
              }
              className="flex-1 text-xs border rounded px-1 py-1"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500 self-center">:</span>
            <select
              value={selectedTime.split(":")[1]}
              onChange={(e) =>
                handleTimeChange(
                  `${selectedTime.split(":")[0]}:${e.target.value}`,
                )
              }
              className="flex-1 text-xs border rounded px-1 py-1"
            >
              {Array.from({ length: 60 }, (_, i) => (
                <option key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="" ref={calendarRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-2 text-left rounded border border-gray-300 bg-gray-50 transition text-sm ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:border-indigo-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
        }`}
      >
        <span
          className={`text-sm truncate ${
            value ? "text-gray-800" : "text-gray-500"
          }`}
        >
          {formatDisplayDate(value)}
        </span>
        <Calendar size={14} className="text-gray-400 ml-2 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 z-50">
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};
