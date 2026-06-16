"use client";

import { useState, useTransition } from "react";
import { isFuture, isToday } from "date-fns";
import { toast } from "sonner";
import {
  createDiaryEntry,
  updateDiaryEntry,
} from "@/src/modules/lib/auth/actions";
import type { DiaryEntryUpdatePayload } from "@/src/modules/lib/auth/types";
import { toDateKey, formatDateStringCapitalized } from "@/src/modules/utils";
import type { WritableDiaryEntryFields } from "@/src/modules/lib/supabase/types";
import {
  DiaryEntryForm,
  DiaryShareDialog,
} from "@/src/modules/components/dashboard";
import type { DiarySectionProps } from "./types";

export default function DiarySection({
  selectedDate,
  entry,
}: DiarySectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formError, setFormError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const selectedDateKey = toDateKey(selectedDate);
  const [prevSelectedDateKey, setPrevSelectedDateKey] =
    useState(selectedDateKey);

  if (prevSelectedDateKey !== selectedDateKey) {
    setPrevSelectedDateKey(selectedDateKey);
    setIsEditing(false);
    setFormError(undefined);
  }

  function handleCreate(entryPayload: WritableDiaryEntryFields) {
    startTransition(async () => {
      setFormError(undefined);
      const result = await createDiaryEntry({}, entryPayload);

      if (result.success) {
        toast.success("Registro guardado.", { id: "diary-entry-created" });
        return;
      }

      if (result.error) {
        setFormError(result.error);
      }
    });
  }

  function handleUpdate(payload: DiaryEntryUpdatePayload) {
    startTransition(async () => {
      setFormError(undefined);
      const result = await updateDiaryEntry({}, payload);

      if (result.success) {
        toast.success("Registro actualizado.", { id: "diary-entry-updated" });
        setIsEditing(false);
        return;
      }

      if (result.error) {
        setFormError(result.error);
      }
    });
  }

  const future = isFuture(selectedDate);
  const hasEntry = Boolean(entry);
  const showForm = isToday(selectedDate) || hasEntry;
  const emptyMessage = future
    ? "Te esperamos para este día"
    : "No tienes ningún registro para este día";
  const showDiaryHint =
    (isToday(selectedDate) && !hasEntry) || (hasEntry && !isEditing);

  return (
    <aside className="flex min-w-0 w-full flex-1 flex-col rounded-2xl bg-brand-surface sm:min-h-0">
      <header className="flex items-start justify-between gap-3 pt-4 px-4 sm:pt-6 sm:px-6">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold tracking-wide text-brand-accent uppercase">
            Diario
          </p>
          <h2 className="text-base sm:text-lg font-semibold text-brand-text ">
            {formatDateStringCapitalized(selectedDate)}
          </h2>
        </div>
        {entry ? (
          <DiaryShareDialog
            entry={entry}
            selectedDate={selectedDate}
            disabled={isEditing}
          />
        ) : null}
      </header>
      {showDiaryHint ? (
        <p className="px-4 py-2 text-sm leading-relaxed text-brand-text/80 sm:px-6">
          {isToday(selectedDate) && !hasEntry
            ? "Al guardar el registro de hoy, la canción quedará fija. Podrás editar la sintonía y nota cuando quieras."
            : "Recuerda que puedes editar la sintonía y la nota cuando quieras."}
        </p>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {showForm ? (
          <DiaryEntryForm
            key={selectedDateKey}
            selectedDate={selectedDate}
            entry={entry}
            isEditing={isEditing}
            onEditingChange={setIsEditing}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            isPending={isPending}
            formError={formError}
          />
        ) : (
          <p className="flex h-full w-full items-center justify-center text-md text-brand-text/80">
            {emptyMessage}
          </p>
        )}
      </div>
    </aside>
  );
}
