import type { Metadata } from "next";
import "@/styles/globals.css";
import { upanddownNormal, poppins } from "@/shared/utils/font";
import { defaultMetadata } from "@/shared/utils/metadata";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} ${upanddownNormal.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
