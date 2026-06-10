"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { hashPassword } from "./password";
import { buildProfileUpdate, validateProfileUpdate } from "./profileForm";
import type { ProfileFormState } from "./types";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
} from "@/src/modules/lib/supabase/data-service";

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

    const racedUser = await getUserByEmail(email);
    if (racedUser?.password_hash) {
      try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: "/dashboard",
        });
        return {};
      } catch (signInError) {
        if (signInError instanceof AuthError) {
          return { error: "No se pudo crear la cuenta. Inténtalo de nuevo." };
        }

        throw signInError;
      }
    }

    console.error(error);
    return { error: "No se pudo crear la cuenta. Inténtalo de nuevo." };
  }

  return {};
}

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Debes tener una sesión activa para actualizar tu perfil.",
    };
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return { error: "No se encontró tu perfil." };
  }

  const validationError = validateProfileUpdate(
    formData,
    user,
    session.user.image,
  );
  if (validationError) {
    return { error: validationError };
  }

  const updateData = buildProfileUpdate(formData, user, session.user.image);
  if (!updateData) {
    return {};
  }

  try {
    await updateUserById(session.user.id, updateData);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "No se pudo actualizar tu perfil. Inténtalo de nuevo." };
  }
}
