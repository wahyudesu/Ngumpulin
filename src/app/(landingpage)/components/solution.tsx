import { SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AtSign, Command, Eclipse } from "lucide-react";
import Image from 'next/image';

const TabAccordion = () => {
  const [activeImage, setActiveImage] = useState('image1');

  const items = [
    {
      id: 'image1',
      icon: Command,
      title: 'Fitur Pertama',
      content: "Schedule your content to be posted on your social accounts at the perfect time.",
      imageUrl: '/fitur/contoh1.png', // Gambar dari folder public/fitur
    },
    {
      id: 'image2',
      icon: AtSign,
      title: 'Fitur Kedua',
      content:
        "Proven viral templates to create content for your brand in minutes. (The same templates we've used to get over 60,000 app downloads to our own apps) Drag and drop using our video maker and get 1000s of potential customers to your page.",
      imageUrl: '/fitur/contoh2.png', // Gambar dari folder public/fitur
    },
    {
      id: 'image3',
      icon: Eclipse,
      title: 'Fitur Ketiga',
      content:
        'View all of your posted content and scheduled content in one place, edit scheduled posts and view your past posts.',
      imageUrl: '/fitur/contoh3.png', // Gambar dari folder public/fitur
    },
  ];

  const handleAccordionChange = (value: SetStateAction<string>) => {
    if (value) {
      setActiveImage(value);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-20 my-8">
      {/* Headings dan Sub-headings */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Grow your social reach with less effort for less money
        </h2>
        <p className="mt-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Using post bridge features
        </p>
      </div>

      {/* Layout untuk tampilan laptop (grid) */}
      <div className="hidden md:grid md:grid-cols-12 gap-6">
        {/* Accordion sebagai trigger */}
        <div className="col-span-4">
          <Accordion
            type="single"
            value={activeImage}
            onValueChange={handleAccordionChange}
            className="w-full"
          >
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border rounded-lg mb-2"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="w-full p-4">
                    <span className="flex items-center gap-3">
                      <item.icon
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 opacity-60"
                        aria-hidden="true"
                      />
                      <span>{item.title}</span>
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="px-4">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Area konten gambar */}
        <div className="col-span-8">
          <div className="rounded-lg border p-4 h-full">
            {items.map((item) => (
              <div
                key={item.id}
                className={`transition-opacity duration-300 ${
                  activeImage === item.id ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={400} // Sesuaikan dengan ukuran gambar
                  height={400} // Sesuaikan dengan ukuran gambar
                  className="w-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layout untuk tampilan mobile (stack) */}
      <div className="md:hidden">
        <Accordion
          type="single"
          value={activeImage}
          onValueChange={handleAccordionChange}
          className="w-full"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border rounded-lg mb-4"
            >
              <AccordionTrigger className="p-4">
                <span className="flex items-center gap-3">
                  <item.icon
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 opacity-60"
                    aria-hidden="true"
                  />
                  <span>{item.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Area konten gambar */}
        <div className="mt-6">
          <div className="rounded-lg border p-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`transition-opacity duration-300 ${
                  activeImage === item.id ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={500} // Sesuaikan dengan ukuran gambar
                  height={500} // Sesuaikan dengan ukuran gambar
                  className="w-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabAccordion;