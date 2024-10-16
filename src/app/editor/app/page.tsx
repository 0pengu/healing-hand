import { checkAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DefaultEditorPage() {
  const [error, user] = await checkAuth();

  if (error) {
    redirect("/auth/login");
  }

  return (
    <div>
      <h1>Editor</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  );
}
