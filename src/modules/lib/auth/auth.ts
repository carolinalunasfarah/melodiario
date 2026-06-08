import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail, createUser } from "../supabase/data-service";
import { authProviders } from "./providers";
import { AvatarSource } from "../supabase/types";

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

        if (!existingUser) {
          await createUser({
            email: user.email,
            name: user.name ?? "",
            avatar_source: (account?.provider as AvatarSource) ?? "custom",
            avatar_type: "turntable",
            avatar_color: "#c4b5fd",
            avatar_external_url: user.image ?? "",
            nickname: user.name ?? "",
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
