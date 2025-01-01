'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uploadassignment } from '@/actions/postassignment';
import { useParams } from 'next/navigation';

export default function SimpleForm() {
  const [file, setFile] = useState<File | null>(null);
  const [nameStudent, setNameStudent] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  const geturlname = params?.nameAssignment as string; // Casting sebagai string
  const nameAssignment = decodeURIComponent(geturlname);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10 MB');
      return;
    }
    setFile(selectedFile || null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setError(null);

    if (!nameStudent.trim() || !file) {
      setError('Name and file are required');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nameStudent', nameStudent);

    try {
      setIsSubmitting(true);
      setStatus('Uploading...');
      await uploadassignment(formData);
      setStatus('File uploaded successfully');
      setNameStudent('');
      setFile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{nameAssignment}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              placeholder="Masukkan nama Anda"
              value={nameStudent}
              onChange={(e) => setNameStudent(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="file">Upload File (PDF)</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {status && <p className="text-green-500 text-sm">{status}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Uploading...' : 'Submit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
