import type { SupabaseUser } from "@/src/modules/lib/supabase/types";

export function resolveSupportContactName(user: SupabaseUser): string | null {
  const name = user.name?.trim();
  if (name) return name;

  const nickname = user.nickname?.trim();
  if (nickname) return nickname;

  return null;
}
