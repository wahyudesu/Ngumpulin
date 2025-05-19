import { Check, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const CTA1 = () => (
  <div className=" w-full py-10 lg:py-10">
    <div className="container mx-auto items-center">
      <div className="flex flex-col gap-10 p-7">
        <div className="max-w-5xl w-full mx-auto flex flex-col text-center bg-accent rounded-lg p-4 lg:p-14 gap-8 items-center">
          <div>
            <Badge>Get started</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              Get Started with Ngumpulin
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
              Simplify assignments and grading today
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button className="gap-4">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
