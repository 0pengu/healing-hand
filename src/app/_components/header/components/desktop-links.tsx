import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DesktopLinks({
  links,
}: {
  links: { title: string; href: string }[];
}) {
  return links.map((link, idx) => (
    <Link
      href={link.href}
      className="text-gray-800 hover:text-gray-900"
      key={idx}
    >
      <Button variant="link">{link.title}</Button>
    </Link>
  ));
}
