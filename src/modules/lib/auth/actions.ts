"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "./auth";
import { hashPassword } from "./password";
import { createUser, getUserByEmail } from "../supabase/data-service";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export type AuthFormState = {
  error?: string;
};

export async function signInWithEmailAndPassword(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email")).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    if (!existingUser.password_hash) {
      return { error: "Esta cuenta usa Google. Inicia sesión con Google." };
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: "Email o contraseña incorrectos." };
      }

      throw error;
    }

    return {};
  }

  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  try {
    const password_hash = await hashPassword(password);

    await createUser({
      email,
      password_hash,
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "No se pudo iniciar sesión." };
    }

    console.error(error);
    return { error: "No se pudo crear la cuenta. Inténtalo de nuevo." };
  }

  return {};
}
