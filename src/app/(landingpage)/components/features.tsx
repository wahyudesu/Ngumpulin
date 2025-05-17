"use client";

import { Tabs } from "@/components/ui/tabs-new";
import Image from "next/image";


export function Features() {
  const tabs = [
    {
      title: "AI-Assisted Assignments",
      value: "assignments",
      content: (
        <div className="w-full flex relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-blue-900">
          <div className="basis-2/6 h-fit">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-200 dark:text-white">
              AI-Assisted Assignments
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-300">
              Our AI-powered assistant helps you create, grade, and manage assignments with ease. Get intelligent suggestions, automated feedback, and personalized learning paths tailored to student needs.
            </p>
          </div>
          <div className="basis-4/6 h-fit">
            <ImageContent src={"/fitur/assignment.jpg"} />
          </div>
        </div>
      ),
    },
    {
      title: "AI-Assisted Documents",
      value: "documents",
      content: (
        <div className="w-full flex relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-blue-900">
          <div className="basis-2/6 h-fit">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-200 dark:text-white">
              AI-Assisted Documents
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-300">
              Our AI-powered assistant helps you create, grade, and manage assignments with ease. Get intelligent suggestions, automated feedback, and personalized learning paths tailored to student needs.
            </p>
          </div>
          <div className="basis-4/6 h-fit">
            <ImageContent src={"/fitur/kelas.jpg"} />
          </div>
        </div>
      ),
    },
    {
      title: "AI-Assisted Classes",
      value: "classes",
      content: (
        <div className="w-full flex relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-blue-900">
          <div className="basis-2/6 h-fit">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-200 dark:text-white">
              AI-Assisted Classes
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-300">
              Our AI-powered assistant helps you create, grade, and manage assignments with ease. Get intelligent suggestions, automated feedback, and personalized learning paths tailored to student needs.
            </p>
          </div>
          <div className="basis-4/6 h-fit">
            <ImageContent src={"/fitur/kelas.jpg"} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start ">
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-black dark:text-white">Features</h1>
      <Tabs tabs={tabs} />
    </div>
  );
}

const ImageContent = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] inset-x-0 w-[90%] rounded-xl mx-auto"
      objectFit="contain"
    />
  );
};
