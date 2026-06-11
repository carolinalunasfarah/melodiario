import type { SupabaseUser } from "../supabase/types";
import { getUserProfileKind } from "../supabase/utils";

/** Google profile photo URL for display and switch-back; DB first, then OAuth session image. */
export function resolveGoogleAvatarUrl(
  user: SupabaseUser,
  sessionImage?: string | null,
): string | null {
  if (getUserProfileKind(user) === "credentials") return null;
  return user.avatar_external_url ?? sessionImage ?? null;
}
