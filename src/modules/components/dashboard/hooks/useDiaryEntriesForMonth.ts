"use client";

import { useCallback, useEffect, useState } from "react";
import { isSameMonth, startOfMonth } from "date-fns";
import { toast } from "sonner";
import { getDiaryEntriesForMonth } from "@/src/modules/lib/auth/actions";
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { monthKeyToDate, toMonthKey } from "@/src/modules/utils";

type UseDiaryEntriesForMonthOptions = {
  initialMonthKey: string;
  initialEntries: DiaryEntry[];
};

export function useDiaryEntriesForMonth({
  initialMonthKey,
  initialEntries,
}: UseDiaryEntriesForMonthOptions) {
  const [displayedMonth, setDisplayedMonth] = useState(() =>
    startOfMonth(monthKeyToDate(initialMonthKey)),
  );
  const [fetchedEntriesByMonth, setFetchedEntriesByMonth] = useState<
    Record<string, DiaryEntry[]>
  >({});

  const displayedMonthKey = toMonthKey(displayedMonth);
  const isInitialMonth = displayedMonthKey === initialMonthKey;
  const fetchedEntries = fetchedEntriesByMonth[displayedMonthKey];
  const entries = isInitialMonth ? initialEntries : (fetchedEntries ?? []);
  const isLoadingMonth = !isInitialMonth && fetchedEntries === undefined;

  useEffect(() => {
    if (!isLoadingMonth) {
      return;
    }

    let cancelled = false;

    void getDiaryEntriesForMonth(displayedMonthKey)
      .then((data) => {
        if (!cancelled) {
          setFetchedEntriesByMonth((previous) => ({
            ...previous,
            [displayedMonthKey]: data,
          }));
        }
      })
      .catch(() => {
        if (!cancelled) {
          toast.error("No se pudieron cargar los registros del mes.", {
            id: "diary-month-fetch-error",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [displayedMonthKey, isLoadingMonth]);

  const handleMonthChange = useCallback((month: Date) => {
    setDisplayedMonth(startOfMonth(month));
  }, []);

  const alignSelectedDateToMonth = useCallback(
    (selectedDate: Date, month: Date) => {
      if (isSameMonth(selectedDate, month)) {
        return selectedDate;
      }

      const today = new Date();
      if (isSameMonth(today, month)) {
        return today;
      }

      return month;
    },
    [],
  );

  return {
    displayedMonth,
    entries,
    isLoadingMonth,
    handleMonthChange,
    alignSelectedDateToMonth,
  };
}
