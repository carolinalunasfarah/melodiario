import { endOfMonth, format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { capitalize } from "./string";

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function toMonthKey(date: Date): string {
  return format(date, "yyyy-MM");
}

const MONTH_KEY_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

export function isValidMonthKey(monthKey: string): boolean {
  if (!MONTH_KEY_PATTERN.test(monthKey)) return false;

  const [, month] = monthKey.split("-").map(Number);
  return month >= 1 && month <= 12;
}

export function monthKeyToDate(monthKey: string): Date {
  return parse(`${monthKey}-01`, "yyyy-MM-dd", new Date());
}

export function getMonthDateRange(monthKey: string): {
  startDate: string;
  endDate: string;
} {
  const monthDate = monthKeyToDate(monthKey);
  return {
    startDate: format(monthDate, "yyyy-MM-dd"),
    endDate: format(endOfMonth(monthDate), "yyyy-MM-dd"),
  };
}

export function formatDateStringCapitalized(date: Date) {
  return `${capitalize(format(date, "EEEE", { locale: es }))} ${format(date, "d", { locale: es })} de ${capitalize(format(date, "MMMM", { locale: es }))}`;
}
