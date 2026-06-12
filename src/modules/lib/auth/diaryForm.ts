import type { DiaryEntryUpdateInput } from "../supabase/types";
import { JOURNAL_MAX_LENGTH } from "./constants";

export function getDiaryUpdateError(
  data: DiaryEntryUpdateInput,
): string | null {
  const commentLength = data.comment?.length ?? 0;

  if (commentLength > JOURNAL_MAX_LENGTH) {
    return `La bitácora no puede tener más de ${JOURNAL_MAX_LENGTH} caracteres.`;
  }

  return null;
}
