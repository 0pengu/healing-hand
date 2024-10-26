"use server";

import { editBlogSchema } from "@/app/editor/blog/[id]/edit/types";
import { newBlogSchema } from "@/app/editor/blog/new/types";
import { createOneBlog } from "@/lib/db/preset/blog";
import { findUserWithId } from "@/lib/db/preset/user";
import { tryCatch } from "@/lib/error-handler";
import { User } from "@prisma/client";
import { z } from "zod";

export async function editBlog(data: z.infer<typeof editBlogSchema>) {
  const parsedData = newBlogSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Invalid data: " + JSON.stringify(parsedData.error));
  }

  const blogData = parsedData.data;

  const authors: User[] = [];

  for (const authorId of blogData.authorIds) {
    const [error, author] = await tryCatch(findUserWithId(authorId));

    if (error || !author) {
      throw new Error("Author not found: " + authorId);
    }

    authors.push(author);
  }

  const [error, blog] = await tryCatch(createOneBlog(blogData));

  if (error) {
    throw new Error("Failed to create blog: " + error.message);
  }

  return [null, { success: true, blogId: blog.id }];
}
