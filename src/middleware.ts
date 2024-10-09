import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is not already at the root
  if (request.nextUrl.pathname !== "/") {
    // Redirect to the root path "/"
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to continue if it's already at "/"
  return NextResponse.next();
}

// Allow all Next.js routing + the static landing-video folder
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|landing-video).*)"],
};
