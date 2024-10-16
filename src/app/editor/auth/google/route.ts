import { google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const state = generateState();
  const verifier = generateCodeVerifier();
  const url = await google.createAuthorizationURL(state, verifier, {
    scopes: ["profile", "email"],
  });

  cookies().set("google_oauth_state", state, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  cookies().set("google_oauth_verifier", verifier, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  redirect(url.toString());
}
