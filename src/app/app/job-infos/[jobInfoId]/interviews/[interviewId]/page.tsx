import { BackLink } from "@/components/BackLink";
import { Skeleton, SkeletonButton } from "@/components/Skeleton";
import { SuspendedItem } from "@/components/SuspendedItem";
import { ActionButton } from "@/components/ui/action-button";
import { db } from "@/drizzle/db";
import { InterviewTable } from "@/drizzle/schema";
import { getInterviewIdTag } from "@/features/interviews/dbCache";
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache";
import { formatDateTime } from "@/lib/formatDateTime";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { eq } from "drizzle-orm";
import { duration } from "drizzle-orm/gel-core";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { generateInterviewFeedback } from "@/features/interviews/actions";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string; interviewId: string }>;
}) {
  const { jobInfoId, interviewId } = await params;

  const interview = await getCurrentUser().then(
    async ({ userId, redirectToSignIn }) => {
      if (userId == null) return redirectToSignIn();

      const interview = await getInterview(interviewId, userId!);
      if (interview == null) return notFound();

      return interview;
    }
  );

  console.log(interview, "interview");

  return (
    <div className="container my-4 space-y-4">
      <BackLink href={`/app/job-infos/${jobInfoId}/interviews`}>
        All Interviews
      </BackLink>

      <div className="space-y-6">
        <div className="flex gap-2 justify-between">
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl md:text-4xl">
              Interview:{" "}
              <SuspendedItem
                item={interview}
                fallback={<Skeleton className="w-48" />}
                result={(i) => formatDateTime(i.createdAt)}
              />
            </h1>
            <p className="text-muted-foreground">
              <SuspendedItem
                item={interview}
                fallback={<Skeleton className="w-48" />}
                result={(i) => i.duration}
              />
            </p>
          </div>

          {/* GENERATE FEEDBACK */}
          <SuspendedItem
            item={interview}
            fallback={<SkeletonButton className="w-32" />}
            result={(i) =>
              i.feedback == null ? (
                <ActionButton
                  action={generateInterviewFeedback.bind(null, i.id)}
                >
                  Generate Feedback
                </ActionButton>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>View Feedback</Button>
                  </DialogTrigger>
                  <DialogContent className="md:max-w-3xl lg:max-w-4xl max-h-[calc(100%-2rem)] overflow-y-auto flex flex-col">
                    <DialogTitle>Feedback</DialogTitle>
                    <MarkdownRenderer>{i.feedback}</MarkdownRenderer>
                  </DialogContent>
                </Dialog>
              )
            }
          />
        </div>

        {/* MESSAGE COMPONENTS HERE */}
        <Suspense
          fallback={<Loader2Icon className="animate-spin m-auto size-24" />}
        >
          <Messages interview={interview} />
        </Suspense>
      </div>
    </div>
  );
}

// TODO: MESSAGE COMPONENT
async function Messages({
  interview,
}: {
  interview: Promise<{ humeChatId: string | null }>;
}) {
  return null;
}

async function getInterview(id: string, userId: string) {
  "use cache";
  cacheTag(getInterviewIdTag(id));

  const interview = await db.query.InterviewTable.findFirst({
    where: eq(InterviewTable.id, id),
    with: {
      jobInfo: {
        columns: {
          id: true,
          userId: true,
        },
      },
    },
  });

  if (interview == null) return null;

  cacheTag(getJobInfoIdTag(interview.jobInfo.id));
  if (interview.jobInfo.userId !== userId) return null;

  return interview;
}
