import Image, { StaticImageData } from "next/image";
import PhotoFrame from "@/assets/peta/photo-frame.svg";
import React from "react";

const PhotoWithFrame = ({
  image,
  alt,
}: {
  image: StaticImageData;
  alt: string;
}) => (
  <div className="relative">
    <Image
      src={PhotoFrame}
      width={400}
      height={400}
      className="w-full h-auto"
      alt="Photo Frame"
      aria-hidden="true"
    />
    <div className="absolute inset-0 flex items-center justify-center px-[4.2rem] py-[3.6rem]">
      <Image
        src={image}
        width={300}
        height={300}
        className="w-full h-full object-cover"
        alt={alt}
      />
    </div>
  </div>
);

export default PhotoWithFrame;
