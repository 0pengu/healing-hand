import { Button } from "@/components/ui/button";
import { checkAuth } from "@/lib/auth";
import { findBlogsWithUserId } from "@/lib/db/preset/blog";
import { tryCatch } from "@/lib/error-handler";
import { redirect } from "next/navigation";

export default async function BlogEditorPage() {
  const [error, user] = await checkAuth();

  if (error) {
    redirect("/editor/auth");
  }

  const [dbError, blogs] = await tryCatch(findBlogsWithUserId(user.id));

  if (dbError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="p-4 font-sans text-5xl font-bold">Gallery Editor</div>
        <Button variant="tertiary">+</Button>
      </div>
      {blogs.length === 0 && (
        <div className="flex h-64 items-center justify-center text-2xl">
          You don{"'"}t have any images yet.
        </div>
      )}
      {blogs.map((blog) => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </div>
  );
}
