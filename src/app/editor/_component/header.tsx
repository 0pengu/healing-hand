import DesktopLinks from "@/app/_components/header/components/desktop-links";
import MobileLinks from "@/app/_components/header/components/mobile-links";
import LogoutButton from "@/app/editor/auth/logout/_components/logout-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Back to Main Site",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "/editor/dashboard",
  },
  {
    title: "Blog Editor",
    href: "/editor/blog",
  },
  {
    title: "Gallery Editor",
    href: "/editor/gallery",
  },
];

export default async function EditorHeader() {
  const path = usePathname();

  /**
   * Do not show the header on the login page.
   */
  if (path.includes("/editor/auth")) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 w-full border border-black bg-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            {/**
             * This has to go here because we want the hamburger icon to be before the logo.
             */}
            <MobileLinks links={links} />
            {/* Large and higher screens: Logo and text */}
            <Link
              href="/"
              className="hidden text-2xl font-bold text-gray-800 lg:inline"
            >
              Healing Hand Initiative
            </Link>
            {/* Small screens: Just logo */}
            <Link
              href="/"
              className="inline text-2xl font-bold text-gray-800 lg:hidden"
            >
              Logo
            </Link>
            <div className="hidden items-center space-x-0 lg:flex">
              <DesktopLinks links={links} />
            </div>
          </div>
          <div className="items-center space-x-2">
            <LogoutButton>Logout</LogoutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
