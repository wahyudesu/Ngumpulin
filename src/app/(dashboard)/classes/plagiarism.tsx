import { getPlagiarism } from "@/actions/plagiarismdetection";

// Contoh penggunaan dalam sebuah fungsi async
const checkPlagiarism = async () => {
  const nameAssignment = "Assignment 3"; // Ganti dengan nama folder tugas yang sesuai
  const documentId = 4; // Ganti dengan ID dokumen yang ingin diperiksa

  try {
    const result = await getPlagiarism(nameAssignment, documentId);

    if (result.highestSimilarity > 0) {
      console.log(`Tingkat kemiripan tertinggi: ${result.highestSimilarity}`);
      console.log(`Dokumen yang mirip memiliki ID: ${result.id}`);
    } else {
      console.log("Tidak ditemukan kemiripan dengan dokumen sebelumnya.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat memeriksa plagiarisme:", error);
  }
};

// Panggil fungsi untuk menjalankan pemeriksaan
checkPlagiarism();