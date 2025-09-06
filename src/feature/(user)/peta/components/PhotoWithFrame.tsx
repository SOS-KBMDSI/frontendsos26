import Image, { StaticImageData } from "next/image";
import PhotoFrame from "@/assets/peta/photo-bg.svg";
import React from "react";

const PhotoWithFrame = ({
  image,
  alt,
}: {
  image: StaticImageData;
  alt: string;
}) => {
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${image.width}/${image.height}` }}
    >
      {/* Frame overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderStyle: "solid",
          borderWidth: "42px",
          borderImageSource: `url(${PhotoFrame.src})`,
          borderImageSlice: "45 fill",
          borderImageRepeat: "stretch",
        }}
      />

      {/* Photo with maintained aspect ratio */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="pt-9 px-10 pb-10 object-cover"
      />
    </div>
  );
};

export default PhotoWithFrame;
