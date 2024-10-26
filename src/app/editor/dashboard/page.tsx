import { checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DefaultEditorPage() {
  const [error, user] = await checkAuth();

  if (error) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen-no-header flex-col p-4">
      <div className="justify-center text-center font-sans text-5xl font-bold">
        Hey, {user.name}! 👋
      </div>
      <div className="items-center justify-center text-center">
        <p className="text-lg">
          This is where you can manage your blog and gallery.
        </p>
        <p className="text-lg">
          Though this is currently a work in progress, you will see your stats
          here.
        </p>
      </div>
    </div>
  );
}
