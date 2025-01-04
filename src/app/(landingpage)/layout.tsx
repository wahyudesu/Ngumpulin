import "@/styles/globals.css";
import { Gabarito } from "next/font/google";
import { type Metadata } from "next";
import Navbar from "./components/navbar";
import { Footer1 } from "@/app/(landingpage)/components/footer";

// Konfigurasi font Gabarito
const gabarito = Gabarito({
  weight: "400", // Regular
  subsets: ["latin"], // Subset yang digunakan
  variable: "--font-gabarito", // Variabel CSS untuk font
});

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
      className={`${gabarito.variable}`}
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