import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "./components/navbar";
import {Footer1} from "@/app/(landingpage)/components/footer";

export const metadata: Metadata = {
  title: "Ngumpulin",
  description: "Dari mahasiswa untuk dosen",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        {children}
        <Footer1 />
      </body>
    </html>
  );
}
