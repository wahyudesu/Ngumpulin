"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { getDataClass, addClass } from '@/actions/class';

interface Class {
  id: string; // Menggunakan string untuk id acak
  className: string;
  totalStudent: number;
}

const ClassCRUD: React.FC = () => {
  const [classesList, setClassesList] = useState<Class[]>([]);
  const [className, setClassName] = useState('');
  const [totalStudent, setTotalStudent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchClasses = async () => {
    const data = await getDataClass();
    const formattedData = data.map((cls) => ({
      ...cls,
      id: cls.id.toString(),
      totalStudent: Number(cls.totalStudent),
    }));
    setClassesList(formattedData);
  };

  useEffect(() => {
    fetchClasses();
  }, []);


  const handleAddClass = async () => {
    if (!className || !totalStudent) return;

    await addClass(className, Number(totalStudent));

    setClassName('');
    setTotalStudent('');
    setIsDialogOpen(false);
    fetchClasses();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">CRUD Kelas</h1>
      <Button onClick={() => setIsDialogOpen(true)} className="mb-4">Tambah Kelas</Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Kelas</TableHead>
            <TableHead>Jumlah Mahasiswa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classesList.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell>{cls.className}</TableCell>
              <TableCell>{cls.totalStudent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Tambah Kelas Baru</DialogTitle>
          <DialogDescription>Masukkan nama kelas dan jumlah mahasiswa.</DialogDescription>
          <Input
            placeholder="Nama Kelas"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="mb-2"
          />
          <Input
            placeholder="Jumlah Mahasiswa"
            value={totalStudent}
            onChange={(e) => setTotalStudent(e.target.value)}
            type="number"
            className="mb-4"
          />
          <Button onClick={handleAddClass}>Tambah</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassCRUD;
