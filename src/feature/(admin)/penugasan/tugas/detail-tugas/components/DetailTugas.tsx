import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import React from "react";

const DetailTugas = () => {
  return (
    <div className="w-full ">
      <h4 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-black">
        Tugas 1 : (nama)
      </h4>
      <p className="mt-8 md:mt-12 lg:mt-20 text-justify text-base md:text-lg lg:text-base ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="mt-12 md:mt-16 lg:mt-24">
        <div className="space-y-2">
          <label htmlFor="#" className="block text-sm md:text-base">
            Link Drive File Pendukung
          </label>
          <Input value={"hhttp:contohaja"} disabled className="w-full" />
        </div>
        <div className="grid grid-cols-2 xl:w-1/2">
          <div className="flex flex-col mt-12 enter space-x-4 text-gray-700">
            <span className="text-primary-500 font-medium">Deadline:</span>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M-7.5 12h1.5m3 0h1.5m3 0h1.5m-7.5 4.5h1.5m3 0h1.5m3 0h1.5M12 12.75v4.5"
                  />
                </svg>
                <span>18 / 9 / 2025</span>
              </div>
              <div className="h-6 border-l border-gray-300"></div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>23 : 59</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-12 enter space-x-4 text-gray-700">
            <span className="text-primary-500 font-medium">Rangkaian:</span>

            <span>1</span>
          </div>
        </div>
        <div className="mt-12">
          <Button variant={"primary"}>Edit Tugas</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailTugas;
