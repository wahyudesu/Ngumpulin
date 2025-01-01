export type Document = {
    id: number;
    nameStudent: string;
    documentName: string;
    documentUrl: string;
    folder: string;
    uploadedDate: Date | null;
    embedding?: number[];
  };