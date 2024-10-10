import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RightHeaderButtons() {
  return (
    <>
      <Link href="/contact">
        <Button size="sm">Contact Us</Button>
      </Link>
      <div className="sm:inline hidden h-4 border-[0.5px] border-black" />
      <Link href="/donate">
        <Button size="sm" variant="secondary">
          Help Our Cause
        </Button>
      </Link>
    </>
  );
}
