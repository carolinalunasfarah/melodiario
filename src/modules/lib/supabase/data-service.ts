import { supabase } from "./supabase";
import { ProfileUpdateInput, SupabaseUser, WritableUserFields } from "./types";

export async function getUserByEmail(
  email: string,
): Promise<SupabaseUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("No se encontró la cuenta por email.");
  }

  return data;
}

export async function getUserById(id: string): Promise<SupabaseUser | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("No se encontró la cuenta por ID.");
  }

  return data;
}

export async function createUser(newUser: WritableUserFields) {
  const { data, error } = await supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("No se pudo crear la cuenta.");
  }

  return data;
}

export async function updateUserById(id: string, data: ProfileUpdateInput) {
  const { data: updatedUser, error } = await supabase
    .from("users")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("No se pudo actualizar la cuenta.");
  }

  return updatedUser;
}
