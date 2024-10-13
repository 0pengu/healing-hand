import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-12 w-full items-center justify-between border border-black bg-gray-800 px-8 text-gray-50">
      <div className="flex items-center">
        <p className="text-sm">© 2024 Healing Hand Initiative</p>
      </div>
      <div>
        <Button variant="secondary" asChild size="sm">
          <Link href="/editor/auth">Login</Link>
        </Button>
      </div>
    </footer>
  );
}
