"use client";

import DesktopLinks from "@/app/_components/header/components/desktop-links";
import MobileLinks from "@/app/_components/header/components/mobile-links";
import RightHeaderButtons from "@/app/_components/header/components/right-header-buttons";
import EditorHeader from "@/app/editor/_component/header";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Do not put this links array inside the function or then React will
 * try to keep track of the array and recalculate it on every render,
 * but this links array will literally never change inside of the deployment.
 *
 * @link https://omarsaade.hashnode.dev/array-outside-component-in-react
 */
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
  const path = usePathname();

  if (path.includes("/editor")) {
    return <EditorHeader />;
  }

  return (
    <div className="sticky top-0 z-50 w-full border border-black bg-yellow-50">
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
            <RightHeaderButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
