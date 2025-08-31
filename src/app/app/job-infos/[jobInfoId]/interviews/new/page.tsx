export default async function NewInterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Create new interview</h1>
    </div>
  );
}
