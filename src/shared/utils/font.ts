import localFont from "next/font/local";

export const upanddownNormal = localFont({
  src: [
    {
      path: "../../assets/fonts/UpAndDown.ttf",
      weight: "400",
    },
  ],
  variable: "--font-upanddownnormal",
});
