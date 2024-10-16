import { GoogleUser } from "@/app/editor/auth/google/callback/type";
import { google, lucia } from "@/lib/auth";
import { createUserWithGoogle, findUserWithGoogleId } from "@/lib/db/preset";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const allowedEmails = (process.env.ALLOWED_EMAILS as string).split(",") ?? [];

/**
 *
 * @todo - Return helpful JSON in development mode.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedVerifier = cookies().get("google_oauth_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedVerifier
  ) {
    return new NextResponse(
      process.env.NODE_ENV === "development"
        ? "Missing some sort of state"
        : null,
      { status: 400 },
    );
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedVerifier);
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    if (!response.ok) {
      return new NextResponse(
        process.env.NODE_ENV === "development"
          ? "Failed to fetch user info"
          : null,
        { status: 500 },
      );
    }

    const data: GoogleUser = await response.json();

    if (!allowedEmails.includes(data.email)) {
      return new NextResponse(
        process.env.NODE_ENV === "development" ? "Email not allowed" : null,
        { status: 403 },
      );
    }

    const existingUser = await findUserWithGoogleId(data.sub);

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      redirect("/editor/app");
    }

    const user = await createUserWithGoogle(
      data.sub,
      data.email,
      data.name,
      data.picture,
    );

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    redirect("/editor/app");
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    // Have to throw error to get Next.js to actually handle the redirects properly. Otherwise, it just hangs.
    /**
     * @todo - Handle this situation better.
     */
    throw error;
    return new Response(null, {
      status: 500,
    });
  }
}
