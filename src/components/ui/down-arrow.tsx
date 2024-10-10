"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

export function DownArrow() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };
    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <motion.div
      className="fixed bottom-4 right-1/2 z-40 h-[1px] rounded-full bg-yellow-50 pb-4"
      animate={{
        y: [0, -10, 0, 20, 0],
      }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      hidden={hidden}
    >
      <FaCaretDown className="z-50 pb-[2px] text-black" size="18" />
    </motion.div>
  );
}
