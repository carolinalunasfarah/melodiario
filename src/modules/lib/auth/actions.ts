"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { hashPassword } from "./password";
import { buildProfileUpdate, profileFieldsFrom } from "./profileForm";
import { resolveGoogleAvatarUrl } from "./profileAvatar";
import { isAllowedAvatarExternalUrl, NICKNAME_MAX_LENGTH } from "./constants";
import { LOGIN_FORM_ERRORS } from "./loginErrors";
import { isValidEmail } from "@/src/modules/utils";
import type { ProfileEditorState, ProfileFormState } from "./types";
import { getUserProfileKind } from "@/src/modules/lib/supabase/utils";
import type { SupabaseUser } from "@/src/modules/lib/supabase/types";
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
} from "@/src/modules/lib/supabase/data-service";

function validateProfileEditor(
  editor: ProfileEditorState,
  user: SupabaseUser,
  sessionImage?: string | null,
): string | null {
  const kind = getUserProfileKind(user);
  const saved = profileFieldsFrom({ source: "user", user, sessionImage });
  const hasCustomAvatar =
    saved.avatar_source === "custom" && Boolean(saved.avatar_type);

  if (editor.nickname.length > NICKNAME_MAX_LENGTH) {
    return `El nombre no puede tener más de ${NICKNAME_MAX_LENGTH} caracteres.`;
  }

  const appliesCustomAvatar =
    (kind === "credentials" && !hasCustomAvatar) ||
    editor.avatarIntent === "pick_custom";

  if (appliesCustomAvatar) {
    if (!editor.avatarType) return "Elige un avatar.";
    if (!editor.avatarColor) return "Elige un color para tu avatar.";
  }

  if (kind === "google" && editor.avatarIntent === "use_google") {
    const avatarUrl = resolveGoogleAvatarUrl(user, sessionImage);

    if (!isAllowedAvatarExternalUrl(avatarUrl)) {
      return "La foto de perfil no es válida.";
    }
  }

  return null;
}

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
    return { error: LOGIN_FORM_ERRORS.requiredFields };
  }

  if (!isValidEmail(email)) {
    return { error: LOGIN_FORM_ERRORS.invalidEmail };
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    if (!existingUser.password_hash) {
      return { error: LOGIN_FORM_ERRORS.googleAccount };
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return { error: LOGIN_FORM_ERRORS.invalidCredentials };
      }

      throw error;
    }

    return {};
  }

  if (password.length < 8) {
    return { error: LOGIN_FORM_ERRORS.passwordTooShort };
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
      return { error: LOGIN_FORM_ERRORS.signInFailed };
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
          return { error: LOGIN_FORM_ERRORS.createAccountFailed };
        }

        throw signInError;
      }
    }

    console.error(error);
    return { error: LOGIN_FORM_ERRORS.createAccountFailed };
  }

  return {};
}

export async function updateProfile(
  _prevState: ProfileFormState,
  editor: ProfileEditorState,
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

  const validationError = validateProfileEditor(
    editor,
    user,
    session.user.image,
  );
  if (validationError) {
    return { error: validationError };
  }

  const updateData = buildProfileUpdate(editor, user, session.user.image);
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
