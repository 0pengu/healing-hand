"use server";

import { newTagSchema } from "@/app/editor/blog/new/_components/upload/tags/types";
import { checkAuth } from "@/lib/auth";
import { createOneTag, findAllTags } from "@/lib/db/preset/tag";
import { tryCatch } from "@/lib/error-handler";

export async function createTag(data: unknown) {
  const [error] = await checkAuth();

  if (error) {
    throw new Error("User not found");
  }

  const [tagError, tags] = await tryCatch(findAllTags());

  if (tagError) {
    throw new Error("Failed to find tags");
  }

  const schema = newTagSchema(tags);

  const parsedData = schema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid data: " + JSON.stringify(parsedData.error));
  }

  const tagData = parsedData.data;

  const [createTagError, tag] = await tryCatch(createOneTag(tagData.name));

  if (createTagError) {
    throw new Error("Failed to create tag: " + createTagError.message);
  }

  return [null, { success: true, tag }];
}
