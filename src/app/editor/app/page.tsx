import { logout } from "@/app/editor/auth/logout/actions";
import { Button } from "@/components/ui/button";
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
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
