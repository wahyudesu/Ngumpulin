"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  className: z.string().min(1, "Class name is required"),
  totalStudent: z.coerce.number().min(0, "Total students must be a positive number"),
})

type FormValues = z.infer<typeof formSchema>

interface ClassFormProps {
  initialData?: {
    className: string
    totalStudent: number
  }
  onSubmit: (values: FormValues) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
}

export function ClassForm({ initialData, onSubmit, onCancel, isSubmitting }: ClassFormProps) {
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      className: "",
      totalStudent: 0,
    },
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      await onSubmit(values)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter class name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalStudent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Students</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter total students" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
