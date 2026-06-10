import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDiaryHeading(date: Date) {
  const capitalize = (value: string) =>
    value.charAt(0).toLocaleUpperCase("es") + value.slice(1);

  return `${capitalize(format(date, "EEEE", { locale: es }))} ${format(date, "d", { locale: es })} de ${capitalize(format(date, "MMMM", { locale: es }))}`;
}
