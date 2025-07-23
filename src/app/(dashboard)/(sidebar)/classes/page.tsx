"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from "lucide-react"
import { getDataClass, addClass, updateClass, deleteClass } from "@/actions/class"
import { ClassForm } from "../../components/class-form"
import { DeleteClassDialog } from "../../components/delete-class-dialog"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Class {
  id: number
  className: string
  totalStudent: number
}

const ClassCRUD: React.FC = () => {
  const [classesList, setClassesList] = useState<Class[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchClasses = async () => {
    try {
      setIsLoading(true)
      const data = await getDataClass()
      const formattedData = data.map((cls) => ({
        id: cls.id,
        className: cls.className !== null && cls.className !== undefined ? cls.className : "",
        totalStudent: Number(cls.totalStudent),
      }))
      setClassesList(formattedData)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch classes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const handleAddClass = async (values: { className: string; totalStudent: number }) => {
    try {
      setIsSubmitting(true)
      const result = await addClass(values.className, values.totalStudent)

      if (result.success) {
        toast({
          title: "Success",
          description: "Class added successfully",
        })
        setIsAddDialogOpen(false)
        fetchClasses()
      } else {
        toast({
          title: "Error",
          description: typeof result.error === "string" ? result.error : "Failed to add class",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditClass = async (values: { className: string; totalStudent: number }) => {
    if (!selectedClass) return

    try {
      setIsSubmitting(true)
      const result = await updateClass(selectedClass.id, values.className, values.totalStudent)

      if (result.success) {
        toast({
          title: "Success",
          description: "Class updated successfully",
        })
        setIsEditDialogOpen(false)
        fetchClasses()
      } else {
        toast({
          title: "Error",
          description: typeof result.error === "string" ? result.error : "Failed to update class",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClass = async () => {
    if (!selectedClass) return

    try {
      setIsDeleting(true)
      const result = await deleteClass(selectedClass.id)

      if (result.success) {
        toast({
          title: "Success",
          description: "Class deleted successfully",
        })
        setIsDeleteDialogOpen(false)
        fetchClasses()
      } else {
        toast({
          title: "Error",
          description: typeof result.error === "string" ? result.error : "Failed to delete class",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">Manajemen Kelas</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading classes...</p>
            </div>
          ) : classesList.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-muted-foreground">Kelas masih kosong, buat terlebih dahulu</p>
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classesList.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>{cls.className}</TableCell>
                      <TableCell>{cls.totalStudent}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Add Class Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogTitle>Add New Class</DialogTitle>
          <DialogDescription>Enter class details below.</DialogDescription>
          <ClassForm onSubmit={handleAddClass} onCancel={() => setIsAddDialogOpen(false)} isSubmitting={isSubmitting} />
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>Update class details below.</DialogDescription>
          {selectedClass && (
            <ClassForm
              initialData={{
                className: selectedClass.className,
                totalStudent: selectedClass.totalStudent,
              }}
              onSubmit={handleEditClass}
              onCancel={() => setIsEditDialogOpen(false)}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Class Dialog */}
      {selectedClass && (
        <DeleteClassDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteClass}
          isDeleting={isDeleting}
          className={selectedClass.className}
        />
      )}
    </div>
  )
}

export default ClassCRUD
