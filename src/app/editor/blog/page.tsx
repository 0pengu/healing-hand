import BlogCard from "@/app/_components/header/components/blog-cards";
import { Button } from "@/components/ui/button";
import { checkAuth } from "@/lib/auth";
import { findBlogsWithUserId } from "@/lib/db/preset/blog";
import { tryCatch } from "@/lib/error-handler";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BlogEditorPage() {
  const [error, user] = await checkAuth();

  if (error) {
    redirect("/editor/auth");
  }

  const [dbError, blogs] = await tryCatch(findBlogsWithUserId(user.id));

  if (dbError) {
    return <div>{dbError.message}</div>;
  }

  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="p-4 font-sans text-5xl font-bold">Blog Editor</div>
        <Button variant="tertiary" asChild>
          <Link href="/editor/blog/new">+</Link>
        </Button>
      </div>
      {blogs.length === 0 && (
        <div className="flex h-64 items-center justify-center text-2xl">
          You don{"'"}t have any blogs yet.
        </div>
      )}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            {...blog}
            tags={blog.tags.map((tag) => tag.name)}
            content={blog.previewContent}
            author={blog.authors}
            slug={blog.id}
            buttonText="View Blog"
            editMode
          />
        ))}
      </div>
    </div>
  );
}
