import { getGlobalTag, getIdTag, getJobInfoTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getQuestionGlobalTag() {
  return getGlobalTag("interviews");
}

export function getQuestionJobInfoTag(jobInfoId: string) {
  return getJobInfoTag("interviews", jobInfoId);
}

export function getQuestionIdTag(id: string) {
  return getIdTag(id, "interviews");
}

export function revalidateQuestionCache({
  id,
  jobInfoId,
}: {
  id: string;
  jobInfoId: string;
}) {
  revalidateTag(getQuestionGlobalTag());
  revalidateTag(getQuestionJobInfoTag(jobInfoId));
  revalidateTag(getQuestionIdTag(id));
}
