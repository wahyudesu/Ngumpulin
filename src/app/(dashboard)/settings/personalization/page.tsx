'use client'

import { useState } from 'react'
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const personaTemplates: { label: string; prompt: string }[] = [
  {
    label: 'Default',
    prompt: 'Gunakan gaya mengajar yang netral, informatif, dan profesional.',
  },
  {
    label: 'Tegas',
    prompt:
      'Bersikap tegas, langsung ke inti, tidak bertele-tele, menyampaikan instruksi dengan jelas dan ringkas.',
  },
  {
    label: 'Santai',
    prompt:
      'Gunakan gaya bahasa santai seperti ngobrol, ramah, dan dekat dengan mahasiswa. Selingi dengan candaan ringan.',
  },
  {
    label: 'Teliti',
    prompt:
      'Berikan penjelasan secara detail dan menyeluruh. Koreksi setiap kesalahan sekecil apapun. Fokus pada ketepatan dan akurasi.',
  },
  {
    label: 'Humoris',
    prompt:
      'Gunakan gaya humoris dan menyenangkan, membuat suasana belajar tidak tegang, namun tetap fokus pada materi.',
  },
  {
    label: 'Langsung to the point',
    prompt:
      'Abaikan basa-basi, langsung masuk ke pokok materi. Fokus pada efisiensi penjelasan dan hasil akhir.',
  },
]

const subjects = [
  'AI', 'Pemrograman', 'Data Science', 'Machine Learning',
  'Sistem Informasi', 'Statistika', 'Etika Teknologi', 'Kalkulus', 'Other',
]

export default function PersonalizationForm() {
  const [selectedTemplate, setSelectedTemplate] = useState('Default')
  const [dosenPersona, setDosenPersona] = useState(
    personaTemplates.find((t) => t.label === 'Default')!.prompt
  )
  const [selectedSubject, setSelectedSubject] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  async function saveSettings() {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  function handleTemplateClick(label: string, prompt: string) {
    setSelectedTemplate(label)
    setDosenPersona(prompt)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Personalisasi Dosen</h3>
        <p className="text-sm text-muted-foreground">
          Atur karakter dan bidang yang diampu oleh dosen AI Anda.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Karakter Dosen</CardTitle>
          <CardDescription>
            Pilih gaya komunikasi anda untuk personalisasi AI Agent.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {personaTemplates.map((template) => (
              <Button
                key={template.label}
                type="button"
                variant={selectedTemplate === template.label ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTemplateClick(template.label, template.prompt)}
              >
                {template.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="persona">Deskripsi Karakter</Label>
            <Textarea
              id="persona"
              value={dosenPersona}
              onChange={(e) => {
                setDosenPersona(e.target.value)
                setSelectedTemplate('') // reset template saat edit manual
              }}
              placeholder="Contoh: Tegas, logis, langsung ke inti..."
              className="resize-none"
              rows={4}
            />
          </div>

          <div className="grid gap-2">
            <Label>Bidang yang Diampu</Label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  type="button"
                  variant={selectedSubject === subject ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSubject(subject)}
                  className={cn('rounded-full')}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={saveSettings} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
