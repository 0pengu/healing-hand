"use client";

import { logout } from "@/app/editor/auth/logout/actions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";
import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const LogoutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "destructive", size, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={async () => {
          await logout();
        }}
      />
    );
  },
);

LogoutButton.displayName = "Button";

export default LogoutButton;
