import { GoogleUser } from "@/app/editor/auth/google/callback/type";
import { google, lucia } from "@/lib/auth";
import { createUserWithGoogle, findUserWithGoogleId } from "@/lib/db/preset";
import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

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
    return new Response(null, {
      status: 400,
    });
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
      return new Response(null, {
        status: 401,
      });
    }

    const data: GoogleUser = await response.json();

    if (!allowedEmails.includes(data.email)) {
      return new Response(null, {
        status: 401,
      });
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
      await redirect("/editor/app");
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
    await redirect("/editor/app");
  } catch (error) {
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    throw error;
    return new Response(null, {
      status: 500,
    });
  }
}
