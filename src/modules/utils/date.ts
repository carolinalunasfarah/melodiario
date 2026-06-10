import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalize } from "./string";

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function formatDateStringCapitalized(date: Date) {
  return `${capitalize(format(date, "EEEE", { locale: es }))} ${format(date, "d", { locale: es })} de ${capitalize(format(date, "MMMM", { locale: es }))}`;
}
