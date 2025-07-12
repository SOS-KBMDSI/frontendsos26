import React from "react";

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  prefix?: string;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  prefix,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 items-center space-x-4 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 ${className}`}
    >
      <div className="flex-shrink-0 bg-primary-500 text-white w-20 h-20 flex items-center justify-center  rounded-full p-5 ">
        {icon}
      </div>

      <div className="flex-grow mt-5">
        <p className=" font-medium text-xl text-gray-500 ">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-3">
          {value} {prefix}
        </p>
      </div>
    </div>
  );
};
