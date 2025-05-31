import Navbar from "./components/navbar";
import {Footer} from "@/app/(landingpage)/components/footer";

export default function LandingPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  );
}