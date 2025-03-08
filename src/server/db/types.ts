export type Document = {
  id: number;
  nameStudent: string;
  documentName: string;
  documentUrl: string;
  folder?: string;
  uploadedDate: Date;
  embedding?: number[];
  plagiarism?: Record<string, any>;
  label: string;
  grade?: number;
  feedback?: string;
  sentences?: number;
  page?: number;
};