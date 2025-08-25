import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function upsertUser(user: typeof UserTable.$inferInsert) {
  await db
    .insert(UserTable)
    .values(user)
    .onConflictDoUpdate({
      target: [UserTable.id], // conflict key
      set: {
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
        updatedAt: user.updatedAt,
      },
    });
}

export async function deleteUser(id: string) {
  await db.delete(UserTable).where(eq(UserTable.id, id));
}
