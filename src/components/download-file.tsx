'use client';

import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

// Supabase Client Setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

interface DownloadFilesProps {
  bucketName: string;
  folderName: string;
}

const DownloadFiles: React.FC<DownloadFilesProps> = ({ bucketName, folderName }) => {
  const handleDownload = async () => {
    try {
      const zip = new JSZip();

      // Dapatkan daftar file di folder
      const { data: files, error } = await supabase.storage
        .from(bucketName)
        .list(folderName, { limit: 100 });

      if (error) {
        console.error('Error fetching files:', error);
        return;
      }

      if (!files || files.length === 0) {
        alert('No files found in the folder.');
        return;
      }

      // Unduh setiap file dan tambahkan ke ZIP
      for (const file of files) {
        const { data: fileData, error: downloadError } = await supabase.storage
          .from(bucketName)
          .download(`${folderName}/${file.name}`);

        if (downloadError) {
          console.error('Error downloading file:', downloadError);
          continue;
        }

        const fileBlob = await fileData?.arrayBuffer(); // Convert file ke array buffer
        if (fileBlob) {
          zip.file(file.name, fileBlob); // Tambahkan ke ZIP
        }
      }

      // Generate ZIP dan unduh
      const zipContent = await zip.generateAsync({ type: 'blob' });
      saveAs(zipContent, `${folderName}.zip`);
    } catch (error) {
      console.error('Error creating ZIP:', error);
    }
  };

  return (
    <Button onClick={handleDownload}>
      Download All Files
    </Button>
  );
};

export default DownloadFiles;
