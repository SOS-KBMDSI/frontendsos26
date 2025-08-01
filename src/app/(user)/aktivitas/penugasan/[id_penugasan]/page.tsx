import { DetailTugasContainer } from "@/feature/(user)/penugasan/detail-tugas/container/DetailTugasContainer";

export default async function DetailTugasPage({
  params,
}: {
  params: Promise<{ id_penugasan: string }>;
}) {
  const { id_penugasan } = await params;

  return <DetailTugasContainer id_penugasan={id_penugasan} />;
}
