// /**
//  * Menghitung cosine similarity antara dua vektor.
//  *
//  * @param {number[]} vectorA - Vektor pertama.
//  * @param {number[]} vectorB - Vektor kedua.
//  * @returns {number} Nilai cosine similarity.
//  */

// export const cosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
//   const dotProduct = vectorA.reduce((sum, a, idx) => sum + a * vectorB[idx], 0); // Hasil kali dot product
//   const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a ** 2, 0)); // Panjang vektor A
//   const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b ** 2, 0)); // Panjang vektor B

//   return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0; // Cosine similarity
// };
