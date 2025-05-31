"use client"

import { Tabs } from "@/components/ui/tabs-new"
import Image from "next/image"

export function Features() {
  const tabs = [
    {
      title: "Plagiarism Detector",
      value: "assignments",
      content: (
        <div className="w-full flex flex-col relative rounded-2xl px-10 pt-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-blue-900">
          <TextContent
            title="AI-Based Plagiarism Detector"
            description="Easily check student assignments for originality with our AI plagiarism detection, ensuring academic integrity and saving you countless hours and precious energy on manual reviews."
          />
          <ImageContent src={"/fitur/assignment.jpg"} />
        </div>
      ),
    },
    {
      title: "Assignment Creator",
      value: "documents",
      content: (
        <div className="w-full flex flex-col relative rounded-2xl px-10 pt-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-blue-900">
          <TextContent
            title="AI-Powered Assignment Creator"
            description="Generate customized assignments in minutes using AI, tailored to your curriculum and student needs. Choose from templates or let the tool design questions, saving you hours of preparation."
          />
          <ImageContent src={"/fitur/kelas.jpg"} />
        </div>
      ),
    },
    {
      title: "Automatic Feedback and Correction",
      value: "classes",
      content: (
        <div className="w-full flex flex-col relative rounded-2xl px-10 pt-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-700 to-blue-900">
          <TextContent
            title="Automatic Feedback and Correction"
            description="Provide instant feedback and corrections on student submissions with automated grading tools, allowing you to focus on teaching while students get detailed insights to improve."
          />
          <ImageContent src={"/fitur/kelas.jpg"} />
        </div>
      ),
    },
  ]

  return (
    <div
      id="features"
      className="h-fit pt-20 [perspective:1000px] relative b flex flex-col lg:max-w-3xl md:max-w-xl max-w-sm mx-auto items-start justify-start"
    >
      <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-black dark:text-white">Main Features</h1>
      <div className="h-[90vh] w-full">
        <Tabs tabs={tabs} />
      </div>
    </div>
  )
}

const ImageContent = ({ src }: { src: string }) => {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%] inset-x-0 w-[90%] rounded-t-xl w-full"
      objectFit="contain"
    />
  )
}

const TextContent = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="flex-grow md:basis-2/6 h-fit">
      <p className="text-base text-gray-200 dark:text-gray-300 mt-1 mb-5">{description}</p>
    </div>
  )
}
