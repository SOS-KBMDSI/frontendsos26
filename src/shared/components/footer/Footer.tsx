import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterLinks } from "./FooterItems";
import { iconSosmedData } from "@/shared/data/iconSosmedData";

import LogoSoS from "@/assets/logo-sos.svg";
import CaturPattern from "@/assets/user/pembatas.svg";

export const Footer = () => {
  return (
    <footer className="bg-secondary-500 text-default-dark ">
      <Image
        src={CaturPattern}
        alt="Footer Pattern"
        className="w-full h-18 object-cover md:h-auto"
        aria-hidden="true"
      />

      <div className="mycontainer py-32 md:py-20">
        <div className="flex flex-col items-center md:flex-row md:justify-around gap-12 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <Image
              src={LogoSoS}
              alt="Logo Synergy Of Symphony"
              className="w-28 md:w-40"
            />
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-2xl text-default-dark">
                Synergy Of Symphony & <br className="hidden md:block" /> Shaping
                The Future
              </h4>
              <p className="text-sm md:text-lg text-black">
                Embark on the Journey, Unite in Symphony
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center md:flex-row md:items-start gap-6 md:gap-24 lg:gap-40">
            <FooterLinks />
            <div className="flex flex-col items-center md:items-start gap-6">
              <h3 className="hidden md:block font-semibold text-xl text-default-dark">
                Sosial Media
              </h3>
              <div className="flex justify-center md:justify-start gap-4">
                {iconSosmedData.map((sosmed) => (
                  <Link
                    key={sosmed.name}
                    href={sosmed.href}
                    aria-label={sosmed.name}
                    className="text-default-dark/80 hover:text-primary-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={sosmed.iconSrc}
                      alt={`${sosmed.name} icon`}
                      height={sosmed.height}
                      width={sosmed.width}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-default-dark/50 text-center py-4 text-default-dark text-sm">
        <p>Made with ❤️ by PIT SOS 2025</p>
      </div>
    </footer>
  );
};
