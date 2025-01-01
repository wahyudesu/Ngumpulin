"use client"

// import { Hero5 } from "@/app/(landingpage)/components/heroes";
import { Heroes } from "@/app/(landingpage)/components/heroes";
import { CTA2 } from "@/app/(landingpage)/components/cta";
import { FAQ2 } from "@/app/(landingpage)/components/faq";
import { Contact1 } from "@/app/(landingpage)/components/contact";

export default function HomePage() {
  return (
    <div>
      <Heroes />
      <FAQ2 />
      <Contact1/>
      <CTA2 />
    </div>
  );
}
