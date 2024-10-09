import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full bg-white border border-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Healing Hand Initiative
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/blog" className="text-gray-800 hover:text-gray-900">
                <Button variant="link" className="font-mono">
                  Blog
                </Button>
              </Link>
              <Link
                href="/gallery"
                className="text-gray-800 hover:text-gray-900"
              >
                <Button variant="link" className="font-mono">
                  Gallery
                </Button>
              </Link>
              <Link
                href="/about-us"
                className="text-gray-800 hover:text-gray-900"
              >
                <Button variant="link" className="font-mono">
                  About Us
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/contact">
              <Button size="sm">Contact Us</Button>
            </Link>
            <div className="mx-4 h-4 border-[0.5px] border-black" />
            <Link href="/donate">
              <Button size="sm" variant="secondary">
                Help Our Cause
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
