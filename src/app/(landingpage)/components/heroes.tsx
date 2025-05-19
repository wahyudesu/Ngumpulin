import { Button } from "@/components/ui/button";
import { ComputerIcon as Windows } from "lucide-react";
import ShimmerButton from "@/components/ui/shimmer-button";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FormEvent, useForm } from "@formspree/react";
import { useState } from "react";
import { SubmissionData, FieldValues } from "@formspree/core";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/spotlight-new";

export function Heroes() {
  const [state, handleSubmit, reset] = useForm("xnnpnley");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e: FormEvent | SubmissionData<FieldValues>) => {
    await handleSubmit(e);
    if (state.succeeded) {
      setIsSubmitted(true);
      reset();
    }
  };
  const words = ["Smarter", "Faster", "Better"]
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Spotlight
      />
      <div className="w-full z-40">
        <section className="container mx-auto text-center flex flex-col items-center justify-center px-6 pb-0 lg:pb-8 gap-4 lg:gap-6 pt-2 md:pt-28 lg:pt-28">

          {/* Heading and Description */}
          <div className="space-y-6 max-w-[800px]">
            <h1 className="text-5xl md:text-6xl max-w-xl tracking-tighter font-semibold">
              Teaching Is Now
              <br />
              <FlipWords words={words} />
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-md">
              Ngumpulin automatically detect plagiarism in student assignments so you can focus on what really matters — teaching.
            </p>

            {/* Email Input and Button */}
            <div className="space-y-2">
              {isSubmitted ? (
                <div className="text-green-600">Thank you for signing up!</div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex justify-center gap-2 pt-2">
                  <Input id="email" name="email" className="flex-1 bg-white" placeholder="Email" type="email" required />
                  <Button type="submit" disabled={state.submitting} variant="default">Join Waitlist</Button>
                </form>
              )}
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
