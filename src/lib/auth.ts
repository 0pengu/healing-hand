import { tryCatch } from "@/lib/error-handler";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { Google } from "arctic";
import { User as DBUser } from "@prisma/client";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

import { Lucia, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { findUserWithId } from "@/lib/db/preset/user";

/**
 * The main instance of Lucia. Used for authenticating users.
 * @see https://lucia-auth.com
 */
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      googleId: attributes.googleId,
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  googleId: number;
  username: string;
}

/**
 * Google OAuth client. Used for authenticating users with Google.
 * @see https://arctic.js.org/providers/google
 * @see Github example - https://lucia-auth.com/tutorials/github-oauth/nextjs-app
 */
export const google = new Google(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  process.env.GOOGLE_REDIRECT_URI as string,
);

/**
 * Please do not use this function yourself. Use `checkAuth` instead, unless you know what you're doing.
 * @deprecated
 */
export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

/**
 * Check if the user is authenticated.
 * @returns [undefined, DBUser] if the user is authenticated, [Error] otherwise if the user is not authenticated or an error occurred.
 * @example 
 * ```tsx
 *const [error, user] = await checkAuth();

  if (error) {
    redirect("/editor/auth");
  }

  return (
    <div>
      <h1>Editor</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  );
    ```
 */
export const checkAuth = async (): Promise<[undefined, DBUser] | [Error]> => {
  const [error, metadata] = await tryCatch(validateRequest());

  if (error || !metadata || !metadata.user) {
    return [new Error("Unauthorized")];
  }

  const dbUser = await findUserWithId(metadata.user.id);

  if (!dbUser) {
    return [new Error("User not found")];
  }

  return [undefined, dbUser];
};
