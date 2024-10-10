"use client";

import React, { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

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
      {/* Hamburger Icon */}
      <HamburgerMenuIcon
        className="text-black sm:hidden inline cursor-pointer"
        onClick={toggleMenu}
      />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 sm:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Dropdown Menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
      >
        <div className="flex justify-end p-4">
          <Button
            variant="link"
            className="text-2xl font-bold text-black"
            onClick={closeMenu}
          >
            X
          </Button>
        </div>

        <div className="p-4 flex flex-col">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-black text-xl mb-4 hover:underline"
              onClick={handleLinkClick}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
