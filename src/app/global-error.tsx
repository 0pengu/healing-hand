"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex h-screen-no-header items-center justify-center">
      <div className="text-center">
        <h1 className="font-sans text-4xl font-bold">
          Uh oh. Something went wrong!
        </h1>
        <Button
          onClick={() => window.location.reload()}
          className="mx-auto mt-6"
        >
          Try Again
        </Button>{" "}
        <div className="inline px-4 font-sans">or</div>
        <Button asChild className="mx-auto mt-6" variant="secondary">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
