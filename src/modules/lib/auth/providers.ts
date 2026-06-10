import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "../supabase/data-service";
import { verifyPassword } from "./password";

export const authProviders = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }),
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Contraseña", type: "password" },
    },
    authorize: async (credentials) => {
      const email = credentials?.email;
      const password = credentials?.password;

      if (typeof email !== "string" || typeof password !== "string") {
        return null;
      }

      const user = await getUserByEmail(email.trim().toLowerCase());
      if (!user?.password_hash || !user.email) return null;

      const isValid = await verifyPassword(password, user.password_hash);
      if (!isValid) return null;

      return {
        id: user.id,
        email: user.email,
      };
    },
  }),
];
