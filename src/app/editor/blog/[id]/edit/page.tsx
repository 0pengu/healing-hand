import EditBlogForm from "@/app/editor/blog/[id]/edit/edit-blog-form";
import { checkAuth } from "@/lib/auth";
import { findBlogWithIdForEditor } from "@/lib/db/preset/blog";
import { findAllTags } from "@/lib/db/preset/tag";
import { findAllUsers } from "@/lib/db/preset/user";
import { tryCatch } from "@/lib/error-handler";
import { redirect } from "next/navigation";

export default async function BlogEditorViewerPage({
  params,
}: {
  params: { id: string };
}) {
  const [error, user] = await checkAuth();

  if (error) {
    redirect("/editor/auth");
  }

  const [
    [blogError, blog],
    [authorUsersError, authorUsers],
    [tagsError, tags],
  ] = await Promise.all([
    tryCatch(findBlogWithIdForEditor(params.id)),
    tryCatch(findAllUsers()),
    tryCatch(findAllTags()),
  ]);

  if (blogError || !blog) {
    return redirect("/editor/blog");
  }

  if (authorUsersError || !authorUsers) {
    return redirect("/editor/blog");
  }

  if (tagsError) {
    return redirect("/editor/blog");
  }

  return (
    <EditBlogForm
      user={user}
      authorUsers={authorUsers}
      tags={tags}
      blog={blog}
    />
  );
}
