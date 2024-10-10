"use client";

import React, { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MobileLinks({
  links,
}: {
  links: { title: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <HamburgerMenuIcon
        className="inline cursor-pointer text-black lg:hidden"
        onClick={toggleMenu}
      />
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
          onClick={closeMenu}
        ></div>
      )}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-2/3 transform bg-yellow-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex items-center justify-between border-b border-gray-300 p-4">
          <span className="text-lg font-semibold text-black">
            Healing Hand Initiative
          </span>
          <Button
            variant="link"
            className="text-3xl font-extralight text-black"
            onClick={closeMenu}
          >
            X
          </Button>
        </div>
        <div className="flex flex-col p-4 font-sans">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="mb-4 text-xl text-black"
              onClick={handleLinkClick}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
