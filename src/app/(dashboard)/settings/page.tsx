'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Save } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const settingsFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Nama harus minimal 2 karakter.',
  }),
  email: z.string().email({
    message: 'Email tidak valid.',
  }),
  bio: z.string().max(160).optional(),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

// Nilai default untuk form
const defaultValues: Partial<SettingsFormValues> = {
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Saya adalah seorang mahasiswa.',
}

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  })

  async function onSubmit(data: SettingsFormValues) {
    setIsSaving(true)

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola pengaturan akun dan preferensi Anda.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>
              Perbarui informasi profil Anda yang akan ditampilkan kepada pengguna lain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama Anda" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nama yang akan ditampilkan di profil Anda.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan email Anda" {...field} />
                      </FormControl>
                      <FormDescription>
                        Email yang akan digunakan untuk notifikasi.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Ceritakan sedikit tentang diri Anda" {...field} />
                      </FormControl>
                      <FormDescription>
                        Deskripsi singkat tentang diri Anda. Maksimal 160 karakter.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSaving}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifikasi</CardTitle>
            <CardDescription>
              Konfigurasi preferensi notifikasi Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <div className="font-medium">Email Notifikasi</div>
                <div className="text-sm text-muted-foreground">
                  Terima notifikasi melalui email saat ada tugas baru.
                </div>
              </div>
              <div>
                <Button variant="outline">Aktif</Button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <div className="font-medium">Pengingat Deadline</div>
                <div className="text-sm text-muted-foreground">
                  Terima pengingat saat deadline tugas mendekati.
                </div>
              </div>
              <div>
                <Button variant="outline">Aktif</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}