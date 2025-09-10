import { JobInfoBackLink } from "@/features/jobInfos/components/JobInfoBackLink";
import { Suspense } from "react";
import { Loader2, Loader2Icon, PlusIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import { getInterviewJobInfoTag } from "@/features/interviews/dbCache";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { InterviewTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default async function InterviewsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
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
  const { userId, redirectToSignIn } = await getCurrentUser();
  if (userId == null) return redirectToSignIn();

  const interviews = await getInterviews(jobInfoId, userId);
  console.log(interviews, "INTERVIEWS FROM db");
  // if (interviews.length === 0) {
  //   return redirect(`/app/job-infos/${jobInfoId}/interviews/new`);
  // }

  return (
    <div className="space-y-6 w-full">
      <div className="flex gap=2 justify-between">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">Interviews</h1>
        <Button asChild>
          <Link href={`/app/job-infos/${jobInfoId}/interviews/new`}>
            <PlusIcon />
            New Interview
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 has-hover:*:not-hover:opacity-70">
        <Link
          className="transition-opacity"
          href={`/app/job-infos/${jobInfoId}/interviews/new`}
        >
          <Card className="h-full flex items-center justify-center border-dashed border-3 border-transparent hover:border-primary/50 transition-colors shadows-none">
            <div className="flex items-center gap-2 tet-lg">
              <PlusIcon className="size-6" />
              New Interview
            </div>
          </Card>
        </Link>

        {/* RENDER INTERVIEWS HERE */}
      </div>
    </div>
  );
}

async function getInterviews(jobInfoId: string, userId: string) {
  "use cache";
  cacheTag(getInterviewJobInfoTag(jobInfoId));
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
