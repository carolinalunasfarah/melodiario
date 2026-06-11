import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import {
  getUserByEmail,
  createUser,
} from "@/src/modules/lib/supabase/data-service";
import { authProviders } from "./providers";
import { getFirstName } from "@/src/modules/utils";

export const authConfig = {
  providers: authProviders,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname === "/login") return true;
      return !!auth?.user;
    },

    async signIn({ user, account }) {
      const email = user.email?.trim().toLowerCase();
      if (!email) return false;

      try {
        const existingUser = await getUserByEmail(email);

        if (existingUser?.password_hash && account?.provider === "google") {
          return "/login?error=email-account";
        }

        if (!existingUser && account?.provider !== "credentials") {
          await createUser({
            email,
            name: getFirstName(user.name) ?? user.name ?? null,
            avatar_source: "google",
            avatar_external_url: user.image ?? null,
          });
        }

        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      const email = session.user.email?.trim().toLowerCase();
      if (!email) return session;

      const user = await getUserByEmail(email);
      session.user.id = user?.id ?? "";
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
