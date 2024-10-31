import { Tags } from "@prisma/client";
import { z } from "zod";

export const newTagSchema = (tags: Tags[]) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(255)
      .refine(
        (name) => {
          return !tags.some((tag) => tag.name === name);
        },
        { message: "Tag name already exists" },
      ),
  });
