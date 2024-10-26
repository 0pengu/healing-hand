import { checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewBlogForm from "@/app/editor/blog/new/_components/new-blog-form";
import { tryCatch } from "@/lib/error-handler";
import { findAllUsers } from "@/lib/db/preset/user";
import { AuthorUser } from "@/app/editor/blog/new/types";
import { findAllTags } from "@/lib/db/preset/tag";

export default async function NewBlogPage() {
  const [error, user] = await checkAuth();

  if (error) {
    redirect("/editor/auth");
  }

  const [[authorError, authorUsers], [tagError, tags]] = await Promise.all([
    tryCatch(findAllUsers()),
    tryCatch(findAllTags()),
  ]);

  if (authorError || !authorUsers) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  if (tagError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  const strippedAuthors: AuthorUser[] = authorUsers;

  return <NewBlogForm user={user} authorUsers={strippedAuthors} tags={tags} />;
}
