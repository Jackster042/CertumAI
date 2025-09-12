export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;

  return <div>JobInfoQuestionsPage{jobInfoId}</div>;
}
