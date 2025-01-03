import { Button } from "@/components/ui/button";
import { ComputerIcon as Windows } from "lucide-react";
import ShimmerButton from "@/components/ui/shimmer-button";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function Heroes() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="overflow-visible absolute inset-0 select-none z-[-1]"
        style={{
          background: `
            radial-gradient(at 53% 78%, rgba(255, 255, 0, 0.3) 0px, transparent 50%),
            radial-gradient(at 71% 91%, rgba(51, 255, 0, 0.3) 0px, transparent 50%),
            radial-gradient(at 31% 91%, rgba(255, 128, 0, 0.17) 0px, transparent 50%)
          `,
        }}
      />
      <div className="w-full">
        <section className="container mx-auto text-center flex flex-col items-center justify-center px-6 lg:pb-8 gap-4 lg:gap-6 pt-2 md:pt-28 lg:pt-28">
          <div className="flex items-center justify-center">
            <ShimmerButton
              shimmerColor="blue"
              background="white"
              className="border- border-black/20 text-black py-1 px-4 hover:bg-gray-50 transition-colors"
            >
              How AI Changes Education
            </ShimmerButton>
          </div>
          <div className="space-y-6 max-w-[800px]">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-semibold">
              Automate your workflow with Ai
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Granola takes your raw meeting notes and makes them awesome
            </p>
            <div className="space-y-2">
              <div className="flex justify-center space-x-4">
                <div className="flex gap-2 pt-2">
                  <Input id="input-22" className="flex-1" placeholder="Email" type="email" />
                  <Button variant="default">Join Waitlist</Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                7 day free trial. No credit card required.
              </p>
            </div>
          </div>
          <div className="relative mx-auto flex w-full items-center justify-center -px-10">
            <div className="relative w-[1000] ">
              {/* Gradien transparan putih */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div
                  className="absolute bottom-0 w-full h-72 bg-gradient-to-t from-white to-transparent rounded-lg"
                  style={{
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* HeroVideoDialog untuk light mode */}
              <HeroVideoDialog
                className="dark:hidden block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                thumbnailAlt="Hero Video"
              />

              {/* HeroVideoDialog untuk dark mode */}
              <HeroVideoDialog
                className="hidden dark:block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                thumbnailAlt="Hero Video"
              />
            </div>
          </div>
        </section>

        {/* Cloud Section */}
        <div className="bg-white sm:py-32">
          <p className="text-center text-xl font-semibold text-gray-500 mb-16">
            Trusted by individuals at
          </p>
          <div className="flex items-center justify-center max-h-12 w-full object-contain lg:col-span-1 space-x-10">
            <Image src="/logo/Logo_PENS.png" alt="PENS" width={120} height={120} className="grayscale hover:grayscale-0" />
            <Image src="/logo/logo-unair.png" alt="UNAIR" width={120} height={120} className="grayscale hover:grayscale-0" />
            <Image src="/logo/logo-unesa.png" alt="UNESA" width={120} height={120} className="grayscale hover:grayscale-0" />
          </div>
        </div>
      </div>
    </div>
  );
}