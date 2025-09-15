import { db } from "@/drizzle/db";
import { JobInfoTable, QuestionTable } from "@/drizzle/schema";
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { and, desc, eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { jobInfoId } = await req.json();
  const { userId } = await getCurrentUser();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Verify user owns this job info
  const jobInfo = await db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, jobInfoId), eq(JobInfoTable.userId, userId)),
  });

  if (!jobInfo) {
    return new Response("Job info not found", { status: 403 });
  }

  // Get the most recent question for this job info
  const question = await db.query.QuestionTable.findFirst({
    where: eq(QuestionTable.jobInfoId, jobInfoId),
    orderBy: desc(QuestionTable.createdAt),
  });

  if (!question) {
    return new Response("Question not found", { status: 404 });
  }

  return Response.json({ questionId: question.id });
}
