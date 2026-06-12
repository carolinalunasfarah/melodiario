"use client";

import { useActionState, useEffect } from "react";
import { isFuture, isToday } from "date-fns";
import { toast } from "sonner";
import { createDiaryEntry } from "@/src/modules/lib/auth/actions";
import type { DiaryFormState } from "@/src/modules/lib/auth/types";
import { toDateKey, formatDateStringCapitalized } from "@/src/modules/utils";
import {
  DiaryEntryForm,
  type DiarySectionProps,
} from "@/src/modules/components/dashboard";

const initialState: DiaryFormState = {};

export default function DiarySection({
  selectedDate,
  entry,
}: DiarySectionProps) {
  const [state, formAction, isPending] = useActionState(
    createDiaryEntry,
    initialState,
  );

  useEffect(() => {
    if (!state.success) return;
    toast.success("Registro guardado.", { id: "diary-entry-created" });
  }, [state]);

  const future = isFuture(selectedDate);
  const hasEntry = Boolean(entry);
  const showForm = isToday(selectedDate) || hasEntry;
  const emptyMessage = future
    ? "Te esperamos para este día"
    : "No tienes ningún registro para este día";

  return (
    <aside className="flex flex-1 flex-col rounded-2xl bg-brand-surface sm:min-h-0">
      <header className="space-y-1 pt-4 pl-4 sm:pt-6 sm:pl-6">
        <p className="text-sm font-semibold tracking-wide text-brand-accent uppercase">
          Diario
        </p>
        <h2 className="text-base font-semibold text-brand-text sm:text-lg">
          {formatDateStringCapitalized(selectedDate)}
        </h2>
      </header>
      <div className="flex min-h-0 flex-1 flex-col">
        {showForm ? (
          <DiaryEntryForm
            key={toDateKey(selectedDate)}
            selectedDate={selectedDate}
            entry={entry}
            formAction={formAction}
            isPending={isPending}
            formError={state.error}
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
