"use client";

import {
  Chevron,
  useDayPicker,
  type MonthCaptionProps as NavigationProps,
} from "react-day-picker";
import { cn } from "@/src/modules/utils/styles";
import { Button } from "@/src/modules/components/ui";

const navButtonClassName =
  "rounded-full fill-brand-accent hover:bg-brand-accent/20 disabled:opacity-35";

export default function CalendarNavigation(props: NavigationProps) {
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
