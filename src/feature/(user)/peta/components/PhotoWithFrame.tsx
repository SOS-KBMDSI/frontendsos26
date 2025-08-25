import Image, { StaticImageData } from "next/image";
import PhotoFrame from "@/assets/peta/photo-bg.svg";
import React from "react";

const PhotoWithFrame = ({
  image,
  alt,
}: {
  image: StaticImageData;
  alt: string;
}) => (
  <div
    className="text-default-dark w-full h-full"
    style={{
      borderStyle: "solid",
      borderWidth: "42px",
      borderImageSource: `url(${PhotoFrame.src})`,
      borderImageSlice: "45 fill",
      borderImageRepeat: "stretch",
    }}
  >
    <Image
      src={image}
      width={300}
      height={300}
      className="w-full h-full object-cover -mt-2"
      alt={alt}
    />
  </div>
);

export default PhotoWithFrame;
