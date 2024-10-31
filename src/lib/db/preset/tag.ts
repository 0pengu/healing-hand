import { db } from "@/lib/db/init";

export async function findAllTags() {
  return await db.tags.findMany();
}

export async function createOneTag(name: string) {
  return await db.tags.create({
    data: {
      name,
    },
  });
}
