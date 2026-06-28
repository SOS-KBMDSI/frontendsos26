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

export const poppins = localFont({
  src: [
    {
      path: "../../assets/fonts/poppins/Poppins-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-ThinItalic.woff",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-ExtraLightItalic.woff",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-LightItalic.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-SemiBoldItalic.woff",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-BoldItalic.woff",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-ExtraBoldItalic.woff",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-Black.woff",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../assets/fonts/poppins/Poppins-BlackItalic.woff",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
});

export const superMario = localFont({
  src: [
    {
      path: "../../assets/fonts/supermario/New Super Mario Font U.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-supermario",
  display: "swap",
});
