import { supabase } from "./supabase";
import { CreateUserInput, SupabaseUser } from "./types";

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
    throw new Error("User could not be fetched");
  }

  return data;
}

export async function createUser(newUser: CreateUserInput) {
  const { data, error } = await supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}
