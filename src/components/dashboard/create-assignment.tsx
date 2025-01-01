import React, { useState } from 'react';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/ui/responsive-modal';
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { z } from 'zod';
import { addFolderAssignment } from '@/actions/getassignment';

// Skema validasi dengan Zod
const assignmentSchema = z.object({
  nameAssignment: z.string().min(1, 'Nama tugas harus diisi'),
  classType: z.string().min(1, 'Kelas harus diisi'),
  assignmentType: z.string().min(1, 'Jenis dokumen harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  dueDate: z.string().optional(),
});

const ResponsiveModalBottom = () => {
  const [nameAssignment, setNameAssignment] = useState('');
  const [classType, setClassType] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk kontrol modal

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Validasi menggunakan Zod
    const result = assignmentSchema.safeParse({
      nameAssignment,
      classType,
      assignmentType,
      description,
      dueDate,
    });

    if (!result.success) {
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach(err => {
        const key = err.path[0];
        if (typeof key === 'string') {
          validationErrors[key] = err.message;
        }
      });
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Reset errors jika validasi berhasil
    setErrors({});

    try {
      // Kirim data ke database
      await addFolderAssignment(
        nameAssignment,
        classType,
        description,
        dueDate ? new Date(dueDate) : undefined
      );

      console.log('Tugas berhasil ditambahkan');
      
      // Reset form setelah sukses
      setNameAssignment('');
      setClassType('');
      setAssignmentType('');
      setDescription('');
      setDueDate('');
      
      // Menutup modal setelah data disimpan
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Gagal menambahkan tugas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={setIsModalOpen}>
      <ResponsiveModalTrigger asChild>
        <Button className="rounded-lg">Tambah tugas</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Tambah Tugas</ResponsiveModalTitle>
          <ResponsiveModalContent>
            <form className={cn("grid items-start gap-4")} onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name_assignment">Nama Tugas</Label>
                <Input
                  name="name_assignment"
                  type="text"
                  placeholder="Contoh Tugas Akhir Pemrograman"
                  required
                  value={nameAssignment}
                  onChange={(e) => setNameAssignment(e.target.value)}
                />
                {errors.nameAssignment && <p className="text-red-500">{errors.nameAssignment}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="class">Kelas</Label>
                <Input
                  name="class_type"
                  placeholder="Contoh: 2 IT B"
                  required
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                />
                {errors.classType && <p className="text-red-500">{errors.classType}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignment">Jenis Dokumen</Label>
                <Input
                  name="assignment_type"
                  placeholder="Contoh: Laporan"
                  required
                  value={assignmentType}
                  onChange={(e) => setAssignmentType(e.target.value)}
                />
                {errors.assignmentType && <p className="text-red-500">{errors.assignmentType}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  name="description"
                  className="resize-none"
                  rows={6}
                  placeholder="Berikan deskripsi yang singkat, mudah, dan sederhana"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p className="text-red-500">{errors.description}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due_date">Tenggat Waktu</Label>
                <Input
                  name="due_date"
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <ResponsiveModalClose asChild>
                  <Button variant="outline">Cancel</Button>
                </ResponsiveModalClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Menyimpan...' : 'Simpan Tugas'}
                </Button>
              </div>
            </form>
          </ResponsiveModalContent>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ResponsiveModalBottom;
