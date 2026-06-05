import {
  Chevron,
  useDayPicker,
  type MonthCaptionProps,
} from "react-day-picker";
import { cn } from "../../lib/utils/cn";
import { Button } from "../ui/Button";

const navButtonClassName =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-full fill-brand-accent transition-colors hover:bg-brand-accent/20 cursor-pointer disabled:pointer-events-none disabled:opacity-35";

export default function CalendarMonthCaption(props: MonthCaptionProps) {
  const { displayIndex, className, children, calendarMonth, ...divProps } =
    props;
  void calendarMonth;

  const { previousMonth, nextMonth, goToMonth, labels, classNames } =
    useDayPicker();

  if (displayIndex !== 0) {
    return (
      <div className={className} {...divProps}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(className, "flex items-center justify-between gap-2")}
      {...divProps}
    >
      <Button
        variant="ghost"
        size="icon"
        className={navButtonClassName}
        disabled={!previousMonth}
        aria-disabled={!previousMonth}
        aria-label={labels.labelPrevious(previousMonth)}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <Chevron
          orientation="left"
          className={classNames.chevron}
          disabled={!previousMonth}
        />
      </Button>

      <div className="flex min-w-0 flex-1 justify-center">{children}</div>

      <Button
        variant="ghost"
        size="icon"
        className={navButtonClassName}
        disabled={!nextMonth}
        aria-disabled={!nextMonth}
        aria-label={labels.labelNext(nextMonth)}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <Chevron
          orientation="right"
          className={classNames.chevron}
          disabled={!nextMonth}
        />
      </Button>
    </div>
  );
}
