import { User } from "@prisma/client";
import { z } from "zod";

export const newBlogSchema = z.object({
  picture: z.string().trim().url(),
  name: z.string().trim().min(1).max(256),
  previewContent: z.string().trim().min(1),
  content: z.string().min(1),
  tagIds: z.array(z.string().trim().min(1)).optional(),
  nodes: z.any(),
  authorIds: z.array(z.string().trim().min(1)),
});

export type AuthorUser = Omit<User, "googleId">;
