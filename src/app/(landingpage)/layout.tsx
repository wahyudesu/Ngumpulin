import "@/styles/globals.css";

import { type Metadata } from "next";
import Navbar from "./components/navbar";
import {Footer} from "@/app/(landingpage)/components/footer";

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