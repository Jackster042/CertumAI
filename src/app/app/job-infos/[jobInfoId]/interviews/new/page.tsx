import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function NewInterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  return (
    <div className="container py-4 gap-4 h-screen-header flex flex-col items-start">
      <Suspense
        fallback={<Loader2Icon className="size-24 animate-spin m-auto" />}
      >
        <SuspendedComponent jobInfoId={jobInfoId} />
      </Suspense>
    </div>
  );
}

async function SuspendedComponent({ jobInfoId }: { jobInfoId: string }) {
  return null;
}
