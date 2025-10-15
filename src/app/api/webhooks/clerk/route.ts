import { deleteUser, upsertUser } from "@/features/users/db";
import { Webhook } from "svix";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const headers = {
      'svix-id': request.headers.get('svix-id') || '',
      'svix-timestamp': request.headers.get('svix-timestamp') || '',
      'svix-signature': request.headers.get('svix-signature') || '',
    };

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET!);
    const event = webhook.verify(payload, headers) as any;

    switch (event.type) {
      case "user.created":
      case "user.updated":
        const clerkData = event.data;
        const email = clerkData.email_addresses.find(
          (e: any) => e.id === clerkData.primary_email_address_id
        )?.email_address;
        if (email == null) {
          return new Response("No primary email found", { status: 400 });
        }

        await upsertUser({
          id: clerkData.id,
          email,
          name: `${clerkData.first_name} ${clerkData.last_name}`,
          imageUrl: clerkData.image_url,
          createdAt: new Date(clerkData.created_at),
          updatedAt: new Date(clerkData.updated_at),
        });

        break;
      case "user.deleted":
        if (event.data.id == null) {
          return new Response("No user ID found", { status: 400 });
        }

        await deleteUser(event.data.id);
        break;
    }
  } catch {
    return new Response("Invalid webhook", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });

  // return new Response("ok", { status: 200 });
}
