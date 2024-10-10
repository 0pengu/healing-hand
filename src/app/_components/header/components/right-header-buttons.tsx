import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RightHeaderButtons() {
  return (
    <>
      <Button size="sm" asChild>
        <Link href="/contact">Contact Us</Link>
      </Button>
      <div className="hidden h-4 border-[0.5px] border-black lg:inline" />
      <Button size="sm" variant="secondary" asChild>
        <Link href="/donate">Help Our Cause</Link>
      </Button>
    </>
  );
}
