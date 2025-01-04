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
      <div className="w-full">
        <section className="container mx-auto text-center flex flex-col items-center justify-center px-6 pb-0 lg:pb-8 gap-4 lg:gap-6 pt-2 md:pt-28 lg:pt-28">
          {/* Shimmer Button */}
          <div className="flex justify-center">
            <ShimmerButton
              shimmerColor="blue"
              background="white"
              className="border border-black/20 text-black py-1 px-4 hover:bg-gray-50 transition-colors"
            >
              How AI Changes Education
            </ShimmerButton>
          </div>

          {/* Heading and Description */}
          <div className="space-y-6 max-w-[800px]">
            <h1 className="text-5xl md:text-6xl max-w-xl tracking-tighter font-semibold">
              Automate your workflow with AI
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-md">
              Meet the modern standard for documentation. Beautiful out of the box, easy to maintain, and built to convert users.
            </p>

            {/* Email Input and Button */}
            <div className="space-y-2">
              <div className="flex justify-center gap-2 pt-2">
                <Input id="input-22" className="flex-1" placeholder="Email" type="email" />
                <Button variant="default">Join Waitlist</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                7 day free trial. No credit card required.
              </p>
            </div>
          </div>

          {/* Hero Video Section */}
          <div className="relative mx-auto w-full flex justify-center -px-10">
            <div className="relative w-[1000px]">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div
                  className="absolute bottom-0 w-full h-72 bg-gradient-to-t from-white to-transparent rounded-lg"
                  style={{ pointerEvents: "none" }}
                />
              </div>

              {/* HeroVideoDialog for Light Mode */}
              <HeroVideoDialog
                className="dark:hidden block"
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                thumbnailAlt="Hero Video"
              />

              {/* HeroVideoDialog for Dark Mode */}
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
      </div>
    </div>
  );
}