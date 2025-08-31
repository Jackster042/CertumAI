import { JobInfoBackLink } from "@/features/jobInfos/components/JobInfoBackLink";
import { Suspense } from "react";
import { Loader2, Loader2Icon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import { getINterviewJobInfoTag } from "@/features/interviews/dbCache";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { InterviewTable } from "@/drizzle/schema";

export default async function InterviewsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  console.log(jobInfoId, "jobInfoId from params");
  return (
    <div className="container py-4 gap-4 h-screen-header flex flex-col items-start">
      <JobInfoBackLink jobInfoId={jobInfoId} />

      <Suspense
        fallback={<Loader2Icon className="size-24 animate-spin m-auto" />}
      >
        <SuspendedPage jobInfoId={jobInfoId} />
      </Suspense>
    </div>
  );
}

async function SuspendedPage({ jobInfoId }: { jobInfoId: string }) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <div>Interview ID: {jobInfoId}</div>;
}

async function getInterviews(jobInfoId: string, userId: string) {
  "use cache";
  cacheTag(getINterviewJobInfoTag(jobInfoId));
  cacheTag(getJobInfoIdTag(jobInfoId));

  const data = await db.query.InterviewTable.findMany({
    where: and(
      eq(InterviewTable.jobInfoId, jobInfoId),
      isNotNull(InterviewTable.humeChatId)
    ),
    with: { jobInfo: { columns: { userId: true } } },
    orderBy: desc(InterviewTable.updatedAt),
  });

  return data.filter((interview) => interview.jobInfo.userId === userId);
}
