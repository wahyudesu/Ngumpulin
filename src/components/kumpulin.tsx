"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { v4 as uuidv4 } from "uuid"
import { getDataClass } from "@/actions/class"
import { useToast } from "@/hooks/use-toast"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type FileData = {
  uuid: string
  nameFile: string
  urlFile: string
  class: string
}

type Class = {
  id: number
  className: string
  totalStudent: number
}

const AssignmentUploadForm = () => {
  const params = useParams()
  const geturlname = params?.nameAssignment as string
  const name = decodeURIComponent(geturlname)
  const { toast } = useToast()

  const [emailStudent, setEmailStudent] = useState("")
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [classes, setClasses] = useState<Class[]>([])
  const [isLoadingClasses, setIsLoadingClasses] = useState(true)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Fetch classes from database
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoadingClasses(true)
        const data = await getDataClass()
        const formattedData = data.map((cls) => ({
          id: cls.id,
          className: cls.className,
          totalStudent: Number(cls.totalStudent),
        }))
        setClasses(formattedData)
      } catch (error) {
        console.error("Failed to fetch classes:", error)
        toast({
          title: "Error",
          description: "Failed to load classes. Please refresh the page.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingClasses(false)
      }
    }

    fetchClasses()
  }, [toast])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailStudent(e.target.value)
  }

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const files = fileInputRef.current?.files
    if (!emailStudent || !selectedClass || !files || files.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields and select at least one file.",
        variant: "destructive",
      })
      return
    }

    setStatusMessage("Uploading files to Supabase Storage...")

    try {
      const fileDataList: FileData[] = []

      for (const file of files) {
        const uuid = uuidv4()
        const filePath = `${name}/${selectedClass}/${file.name}`

        const { error: uploadError } = await supabase.storage.from("Kumpulin").upload(filePath, file)

        if (uploadError) throw new Error(uploadError.message)

        const { data: publicUrlData } = supabase.storage.from("Kumpulin").getPublicUrl(filePath)

        if (!publicUrlData?.publicUrl) throw new Error("Failed to get public URL")

        fileDataList.push({
          uuid,
          nameFile: file.name,
          urlFile: publicUrlData.publicUrl,
          class: selectedClass,
        })
      }

      if (fileDataList.length === 0) {
        throw new Error("No files were processed.")
      }

      setStatusMessage("Saving file metadata to Supabase table...")

      const { error: insertError } = await supabase.from("documents").insert(
        fileDataList.map((fileData) => ({
          id: fileData.uuid,
          documentName: fileData.nameFile,
          documentUrl: fileData.urlFile,
          class: fileData.class,
          email: emailStudent,
          folder: name,
          uploadedDate: new Date().toISOString(),
        })),
      )

      if (insertError) throw new Error(insertError.message)

      setStatusMessage("Upload Successful!")

      // Reset form
      setEmailStudent("")
      setSelectedClass("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      toast({
        title: "Success",
        description: "Assignment uploaded successfully!",
      })
    } catch (error) {
      const errorMessage = `Error: ${error}`
      setStatusMessage(errorMessage)
      toast({
        title: "Upload Failed",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Upload {name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="emailStudent" className="block text-sm font-medium mb-1">
            Masukkan email
          </label>
          <input
            type="email"
            id="emailStudent"
            value={emailStudent}
            onChange={handleNameChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter student's email"
            required
          />
        </div>

        <div>
          <label htmlFor="classSelect" className="block text-sm font-medium mb-1">
            Pilih Kelas
          </label>
          <select
            id="classSelect"
            value={selectedClass}
            onChange={handleClassChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoadingClasses}
          >
            <option value="">{isLoadingClasses ? "Loading classes..." : "Pilih Kelas"}</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.className}>
                {classItem.className} ({classItem.totalStudent} students)
              </option>
            ))}
          </select>
          {isLoadingClasses && <p className="text-sm text-gray-500 mt-1">Loading available classes...</p>}
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            Assignment Files
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="file"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            multiple
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoadingClasses}
        >
          Upload Assignments
        </button>

        {statusMessage && (
          <div className="flex items-center justify-center">
            <Badge
              className={`text-sm ${statusMessage.includes("Error")
                ? "bg-red-600 hover:bg-red-700"
                : statusMessage.includes("Successful")
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {statusMessage}
            </Badge>
          </div>
        )}
      </form>
    </div>
  )
}

export default AssignmentUploadForm
