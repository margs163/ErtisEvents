import type { Metadata } from "next";
import { Montserrat, Roboto, Inter, Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/core/Providers";

const montFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const robotoFont = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const geistFont = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "OquHard | Learn Algorithms and Data Structures with OquHard",
  description: "Algorithms and Data Structures explained and simplified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montFont.variable} ${geistFont.variable} ${interFont.variable} ${robotoFont.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
