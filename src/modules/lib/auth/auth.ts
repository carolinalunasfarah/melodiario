import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail, createUser } from "../supabase/data-service";
import { authProviders } from "./providers";

export const authConfig = {
  providers: authProviders,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname === "/login") return true;
      return !!auth?.user;
    },

    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        const existingUser = await getUserByEmail(user.email);

        if (existingUser?.password_hash && account?.provider === "google") {
          return "/login?error=email-account";
        }

        if (!existingUser && account?.provider !== "credentials") {
          await createUser({
            email: user.email,
            name: user.name,
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
      const user = await getUserByEmail(session.user.email);
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
