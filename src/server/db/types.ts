export type Document = {
  id: string;
  NRP: number;
  nameStudent: string;
  email: string;
  class: string;
  documentName: string;
  documentUrl: string;
  folder?: string;
  uploadedDate: Date;
  embedding?: number[];
  deadline: Date;
  plagiarism?: Record<string, any>;
  grade?: number;
  feedback?: string;
  sentences?: number;
  page?: number;
  isiTugas: string;
};