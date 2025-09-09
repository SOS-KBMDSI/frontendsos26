import React from "react";

const HeaderPresensiCard = () => {
  return (
    <div className="flex bg-primary-500 rounded-md px-12 text-default-light font-semibold py-4 gap-4 text-xl">
      <div className="w-3/12">
        <span>Rangkaian</span>
      </div>
      <div className="w-2/12">
        <span>Sesi</span>
      </div>
      <div className="w-3/12">
        <span>Waktu</span>
      </div>
      <div className="w-4/12">
        <span>Tanggal</span>
      </div>
    </div>
  );
};

export default HeaderPresensiCard;
