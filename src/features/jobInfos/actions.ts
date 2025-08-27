"use server";
import { JobInfoTable } from "./../../drizzle/schema/jobInfo";

import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { jobInfoSchema } from "./schemas";
import { insertJobInfo, updateJobInfo as updateJobInfoDb } from "./db";
import { redirect } from "next/navigation";
import z from "zod";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { getJobInfoIdTag } from "./dbCache";
import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";

export async function createJobInfo(unsafeData: z.infer<typeof jobInfoSchema>) {
  const { userId } = await getCurrentUser({ allData: true });
  if (userId == null) {
    return {
      error: true,
      message: "You don't have permission to create a job info",
    };
  }
  const { success, data } = jobInfoSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "Invalid job info data",
    };
  }
  const jobInfo = await insertJobInfo({ ...data, userId });
  redirect(`/app/job-infos/${jobInfo.id}`);
}

export async function updateJobInfo(
  id: string,
  unsafeData: z.infer<typeof jobInfoSchema>
) {
  const { userId } = await getCurrentUser({ allData: true });
  if (userId == null) {
    return {
      error: true,
      message: "You don't have permission to update a job info",
    };
  }

  const { success, data } = jobInfoSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "Invalid job info data",
    };
  }
  const existingJobInfo = await getJobInfo(id, userId);
  if (!existingJobInfo) {
    return {
      error: true,
      message: "Job info not found",
    };
  }
  const jobInfo = await updateJobInfoDb(id, data);
  redirect(`/app/job-infos/${jobInfo.id}`);
}

export async function getJobInfo(id: string, userId: string) {
  "use cache";
  cacheTag(getJobInfoIdTag(id));

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id) && eq(JobInfoTable.userId, userId)),
  });
}
