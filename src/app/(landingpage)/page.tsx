"use client"

// import { Hero5 } from "@/app/(landingpage)/components/heroes";
import { Heroes } from "@/app/(landingpage)/components/heroes";
import { CTA1 } from "@/app/(landingpage)/components/cta";
import { FAQ2 } from "@/app/(landingpage)/components/faq";
import { Contact1 } from "@/app/(landingpage)/components/contact";
import Problem from "./components/problem";
import LogoCloud from "./components/logo-cloud";
import SolutionsSection from "./components/solution";
import { Features } from "./components/features";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div>
      <Heroes />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <LogoCloud />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Features />
      </motion.div>
      <Problem />
      <SolutionsSection />
      <FAQ2 />
      <CTA1 />
    </div>
  );
}
