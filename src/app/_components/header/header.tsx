import DesktopLinks from "@/app/_components/header/components/desktop-links";
import MobileLinks from "@/app/_components/header/components/mobile-links";
import RightHeaderButtons from "@/app/_components/header/components/right-header-buttons";
import Link from "next/link";

const links = [
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
  {
    title: "About Us",
    href: "/aboutus",
  },
];

export default function Header() {
  return (
    <div className="w-full bg-white border border-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <MobileLinks links={links} />
            <Link
              href="/"
              className="text-2xl font-bold text-gray-800 sm:inline hidden"
            >
              Healing Hand Initiative
            </Link>
            <Link
              href="/"
              className="text-2xl font-bold text-gray-800 sm:hidden inline"
            >
              HHI
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <DesktopLinks links={links} />
            </div>
          </div>
          <div className="items-center space-x-2">
            <RightHeaderButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
