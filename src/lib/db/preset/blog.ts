import { editBlogSchema } from "@/app/editor/blog/[id]/edit/types";
import { newBlogSchema } from "@/app/editor/blog/new/types";
import { db } from "@/lib/db/init";
import { z } from "zod";

export const findBlogsWithUserId = async (id: string) => {
  return await db.blog.findMany({
    where: {
      authors: {
        some: {
          id,
        },
      },
    },
    include: {
      authors: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          type: true,
        },
      },
      tags: true,
    },
  });
};

export const createOneBlog = async (
  blogData: z.infer<typeof newBlogSchema>,
) => {
  return await db.blog.create({
    data: {
      Nodes: JSON.parse(blogData.nodes),
      imageUrl: blogData.picture,
      previewContent: blogData.previewContent,
      title: blogData.name,
      content: blogData.content,
      authors: {
        connect: blogData.authorIds.map((id) => ({ id })),
      },
      tags: {
        connect: blogData.tagIds?.map((id) => ({ id })),
      },
    },
  });
};

export const updateBlog = async (blogData: z.infer<typeof editBlogSchema>) => {
  return await db.blog.update({
    where: { id: blogData.id },
    data: {
      Nodes: blogData.nodes,
      imageUrl: blogData.picture,
      previewContent: blogData.previewContent,
      title: blogData.name,
      content: blogData.content,
      authors: {
        set: blogData.authorIds.map((id) => ({ id })),
      },
      tags: {
        set: blogData.tagIds?.map((id) => ({ id })),
      },
    },
  });
};

export const findBlogWithIdForEditor = async (id: string) => {
  return await db.blog.findUnique({
    where: { id },
    include: {
      authors: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          type: true,
        },
      },
      tags: true,
    },
  });
};
