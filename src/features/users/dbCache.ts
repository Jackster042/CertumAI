import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getUserGlobalTag() {
  return getGlobalTag("users");
}

export function getUserIdTag(id: string) {
  return getIdTag(id, "users");
}

export function revalidateUserCache(id: string) {
  revalidateTag(getUserGlobalTag());
  revalidateTag(getUserIdTag(id));
}
