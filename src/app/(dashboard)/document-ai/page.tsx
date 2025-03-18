import { getDataByNameLabel } from "@/actions/getassignment";
import { Badge } from "@/components/ui/badge";

export default async function AssignmentPage() {
  const nameAssignment = "Assignment 3"; // Nama folder tugas

  try {
    // Panggil fungsi getDataByNameLabel dengan nameAssignment dan id
    const status = await getDataByNameLabel(nameAssignment);
    const badgeVariant = status === "Terlambat" ? "destructive" : "success";

    return (
      <div>
        <h2>Status Pengumpulan:</h2>
        {/* Tampilkan status dalam Badge dengan variant yang sesuai */}
        <Badge variant={badgeVariant}>
          {status}
        </Badge>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>Detail Assignment: {nameAssignment}</h1>
        <h2>Error:</h2>
        <p>{error instanceof Error ? error.message : 'Terjadi kesalahan'}</p>
      </div>
    );
  }
}