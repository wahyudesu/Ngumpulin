"use client"

// import { Hero5 } from "@/app/(landingpage)/components/heroes";
import { Heroes } from "@/app/(landingpage)/components/heroes";
import { CTA1 } from "@/app/(landingpage)/components/cta";
import { FAQ2 } from "@/app/(landingpage)/components/faq";
import { Contact1 } from "@/app/(landingpage)/components/contact";
import Problem from "./components/problem";
import LogoCloud from "./components/logo-cloud";
import SolutionsSection from "./components/solution";

export default function HomePage() {
  return (
    <div className="light-theme">
      <Heroes />
      <LogoCloud/>
      <Problem/>
      <SolutionsSection/>
      <FAQ2 />
      <CTA1 />
    </div>
  );
}
