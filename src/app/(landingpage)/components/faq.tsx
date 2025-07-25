import { PhoneCall } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"
import Link from "next/link"

const items = [
  {
    id: "1",
    title: "What types of tasks can be processed?",
    content:
      "Currently, the most optimized type of task is lab reports. However, in the future, various other types of tasks such as essays, presentations (PPT), Excel files, code files, and more will be supported.",
  },
  {
    id: "2",
    title: "Is this platform secure?",
    content:
      "Yes, it is very secure. Authentication uses Supabase Auth, Arcjet is used for secure code injection, and the form setup uses a default password.",
  },
  {
    id: "3",
    title: "Is there integration with the university's LMS?",
    content:
      "No, university systems are usually outdated. However, the assignment results can be exported to CSV, Excel, or PDF formats to be processed further.",
  },
  {
    id: "4",
    title: "Is it only for assignments? What about exams?",
    content:
      "Currently, it is focused on assignments. If there is a lot of feedback requesting exam features, it is possible that in the future there will be features for creating and checking exams like midterms or finals.",
  },
]

export const FAQ2 = () => (
  <div id="faq" className="bg-blue-50 w-full pt-20 lg:py-10">
    <div className="container mx-auto items-center">
      <div className="flex flex-col gap-10 p-7">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge variant="outline" className="text-black">FAQ</Badge>
          <div className="flex gap-2 flex-col">
            <h1 className="text-3xl md:text-5xl tracking-tighter text-black max-w-xl text-center font-semibold">
              Questions Around Ngumpulin
            </h1>
          </div>
          <div>
            <Link href="contact">
              <Button className="gap-4" variant="outline">
                Any questions? Reach out <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-w-3xl w-full mx-auto text-left">
          <Accordion type="single" collapsible className="w-full" defaultValue="3">
            {items.map((item) => (
              <AccordionItem value={item.id} key={item.id} className="border-b">
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="flex flex-1 text-black items-center justify-between py-4 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                    {item.title}
                    <Plus
                      size={16}
                      strokeWidth={2}
                      className="shrink-0 opacity-60 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-2 text-muted-foreground">{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </div>
)
