import "@/styles/globals.css";

import { type Metadata } from "next";
import Navbar from "./components/navbar";
import {Footer} from "@/app/(landingpage)/components/footer";
import { Gabarito } from 'next/font/google'

export const metadata: Metadata = {
  title: "Ngumpulin",
  description: "Dari mahasiswa untuk dosen",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const gabarito = Gabarito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gabarito',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${gabarito.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}