import { getDataByNameLabel } from "@/actions/getassignment";
import { Badge } from "@/components/ui/badge";
import { useParams } from 'next/navigation';

interface AssignmentPageProps {
  params: {
    id: string;
    nameAssignment: string;
  };
}

export default async function AssignmentPage({ params }: AssignmentPageProps) {
  const { id, nameAssignment } = params;

  try {
    // Panggil fungsi getDataByNameLabel dengan nameAssignment dan id
    const status = await getDataByNameLabel(nameAssignment, parseInt(id));
    const badgeVariant = status === "Terlambat" ? "destructive" : "success";

    return (
      <div>
        <h1>Detail Assignment: {id}</h1>
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