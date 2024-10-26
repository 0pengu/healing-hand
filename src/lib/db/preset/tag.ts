import { db } from "@/lib/db/init";

export async function findAllTags() {
  return await db.tags.findMany();
}
