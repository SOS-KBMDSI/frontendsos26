import type { Metadata } from "next";
import "@/styles/globals.css";
import { upanddownNormal, poppins } from "@/shared/utils/font";

export const metadata: Metadata = {
  title: "Synergy of Symphony",
  description: "SOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${upanddownNormal.variable}  font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
