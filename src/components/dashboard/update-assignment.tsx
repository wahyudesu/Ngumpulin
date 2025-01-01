'use client';
import React, { useState, useEffect } from 'react';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '@/components/ui/responsive-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { z } from 'zod';
import { editFolderAssignment, getDataById, deleteFolderAssignment } from '@/actions/getassignment';
import { Pencil, Trash } from 'lucide-react';

// Validasi dengan Zod
const assignmentSchema = z.object({
  nameAssignment: z.string().min(1, 'Nama tugas harus diisi'),
  className: z.string().min(1, 'Kelas harus diisi'),
  assignmentType: z.string().min(1, 'Jenis dokumen harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  dueDate: z.string().optional(),
});

const UpdateAssignmentFolder = ({ id }: { id: number }) => {
  return (
    <div className="space-y-3">
      <Modal id={id} side="bottom" />
    </div>
  );
};

const Modal = ({ id, side }: { id: number; side: 'bottom' }) => {
  const [nameAssignment, setNameAssignment] = useState('');
  const [className, setClassName] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mengambil data awal dari database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataById(id);
        if (data && data.length > 0) {
          const assignment = data[0];
          setNameAssignment(assignment?.nameAssignment || '');
          setClassName(assignment?.className || '');
          setAssignmentType(assignment?.assignmentType || '');
          setDescription(assignment?.description || '');
          setDueDate(
            assignment?.dueDate
              ? new Date(assignment.dueDate).toISOString().slice(0, 16)
              : ''
          );
        }
      } catch (error) {
        console.error('Gagal mengambil data tugas:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // Submit form untuk update data
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Validasi data form
    const result = assignmentSchema.safeParse({
      nameAssignment,
      className,
      assignmentType,
      description,
      dueDate,
    });

    if (!result.success) {
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0];
        if (typeof key === 'string') {
          validationErrors[key] = err.message;
        }
      });
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    setErrors({}); // Reset error jika validasi sukses

    try {
      // Update data ke database
      await editFolderAssignment(
        id,
        nameAssignment,
        className,
        description,
        dueDate ? new Date(dueDate) : undefined
      );

      console.log('Tugas berhasil diperbarui');
    } catch (error) {
      console.error('Gagal memperbarui tugas:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFolderAssignment(id);
      console.log('Tugas berhasil dihapus');
      // Redirect atau tindakan lain setelah penghapusan
      window.location.reload(); // Contoh: Reload halaman
    } catch (error) {
      console.error('Gagal menghapus tugas:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <button className="hover:ring-2 ring-black/30 rounded-lg">
          <Pencil size={25} className="border rounded-lg p-1" />
        </button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent side={side}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Perbarui Tugas</ResponsiveModalTitle>
          <ResponsiveModalContent>
            <form className={cn('grid items-start gap-4')} onSubmit={handleSubmit}>
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
                  name="class_name"
                  placeholder="Contoh: 2 IT B"
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
                {errors.className && <p className="text-red-500">{errors.className}</p>}
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
              <div className='flex justify-between'>
                <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                  <Button variant="destructive" effect="expandIcon" icon={Trash} iconPlacement="left">
                    Hapus
                  </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Take a moment to review the details provided to ensure you understand the implications.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={handleDelete}
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                </div>
                <div className="flex justify-end gap-2">
                  <ResponsiveModalClose asChild>
                    <Button variant="outline">Batal</Button>
                  </ResponsiveModalClose>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Menyimpan...' : 'Simpan Tugas'}
                  </Button>
                </div>
              </div>
            </form>
          </ResponsiveModalContent>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default UpdateAssignmentFolder;
