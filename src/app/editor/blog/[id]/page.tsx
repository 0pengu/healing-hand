import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { checkAuth } from "@/lib/auth";
import { findBlogWithIdForEditor } from "@/lib/db/preset/blog";
import { tryCatch } from "@/lib/error-handler";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BlogEditorViewerPage({
  params,
}: {
  params: { id: string };
}) {
  const [error] = await checkAuth();

  if (error) {
    redirect("/editor/auth");
  }

  const [blogError, blog] = await tryCatch(findBlogWithIdForEditor(params.id));

  if (blogError || !blog) {
    return redirect("/editor/blog");
  }

  return (
    <div className="flex min-h-screen w-screen flex-col">
      <h1 className="p-4">{blog.title}</h1>
      <div className="px-4 pb-2">
        <div className="flex -space-x-3">
          {blog.authors.map((auth, idx) => (
            <Avatar className="h-6 w-6 border bg-white" key={idx}>
              {auth.image ? (
                <AvatarImage src={auth.image} alt={auth.name ?? ""} />
              ) : (
                <AvatarFallback>{auth.name?.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
          ))}
        </div>
        by {blog.authors.map((author) => author.name).join(", ")}
      </div>
      <div className="mx-4 flex flex-col items-center rounded-sm border border-black bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blog.imageUrl}
          alt={blog.title + " image"}
          className="rounded-lg object-contain"
        />
      </div>
      <div className="flex flex-col items-center">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="w-1/2 pb-8 font-sans"
        />
      </div>
      <div className="justify-items flex flex-col items-center">
        <Button variant={"secondary"} className="w-1/2" asChild>
          <Link href={`/editor/blog/${params.id}/edit`}>Edit Blog</Link>
        </Button>
      </div>
    </div>
  );
}
