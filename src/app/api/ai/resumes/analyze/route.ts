import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";

export async function POST(req: Request) {
  const { userId } = await getCurrentUser();
  if (userId == null)
    return new Response("You are not logged in", { status: 401 });

  return null;
}
