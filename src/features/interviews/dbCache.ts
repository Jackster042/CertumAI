import { getGlobalTag, getJobInfoTag } from "@/lib/dataCache";

export function getInterviewGlobalTag() {
  return getGlobalTag("interviews");
}

export function getINterviewJobInfoTag(jobInfoId: string) {
  return getJobInfoTag("interviews", jobInfoId);
}
