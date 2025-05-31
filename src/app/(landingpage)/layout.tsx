import Navbar from "./components/navbar";
<<<<<<< Updated upstream
import { Footer } from "@/app/(landingpage)/components/footer";
import { Gabarito } from 'next/font/google'
=======
import {Footer} from "@/app/(landingpage)/components/footer";

export default function LandingPageLayout({
export default function LandingPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<<<<<<< Updated upstream
    <div
      className={`${gabarito.variable}`}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
=======
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
>>>>>>> Stashed changes
  );
}
