import { Check, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import Image from "next/image";
import TabDemo from "./solution";

const items = [
  {
    id: "1",
    title: "Jenis tugas apa saja yang bisa diproses?",
    content:
      "Untuk saat ini tugas yang paling optimal adalah jenis tugas laprak. Namun di masa mendatang akan dengan berbagai jenis tugas lain seperti essay, ppt, excel, code file, dan lain-lain",
  },
  {
    id: "2",
    title: "Apakah platform ini mempunyai sistem yang aman?",
    content:
      "Yap, sangat aman. Autentifikasinya menggunakan clerk, dan arcjet sebagai secure code injection, dan set up formnya menggunakan password by default.",
  },
  {
    id: "3",
    title: "Apakah ada integrasi dengan LMS yang dimiliki oleh kampus",
    content:
      "Tidak bisa, sistem kampus biasanya jadul. Tapi hasil penugasan bisa diexport menjadi csv, excel, atau pdf untuk kemudian bisa diolah di proses selanjutnya",
  },
  {
    id: "4",
    title: "Apakah hanya untuk tugas saja? untuk ujian bagaimana?",
    content:
      "Saat ini hanya berfokus ke penugasan, jika banyak feedback terkait fitur ujian, ke depannya memungkinkan untuk terdapat fitur pembuatan dan pengecekan ujian seperti UTS/UAS",
  },
];

export const FAQ2 = () => (
  <div className="bg-blue-50 w-full py-10 lg:py-10">
    <div className="container mx-auto items-center">
      {/* <div className="flex max-w-xl justify-center item-center">
        <TabDemo/>
      </div> */}
      {/* FAQ */}
      <div className="flex flex-col gap-10 p-7">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <Badge variant="outline">FAQ</Badge>
          <div className="flex gap-2 flex-col">
            <h1 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-semibold">
              Pertanyaan seputar Ngumpulin
            </h1>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
          <div>
            <Button className="gap-4" variant="outline">
              Any questions? Reach out <PhoneCall className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="max-w-3xl w-full mx-auto text-left">
          <Accordion type="single" collapsible className="w-full" defaultValue="3">
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id} className="border-b">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-4 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                  {item.title}
                  <Plus
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pb-2 text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </div>
    </div>
  </div>
);