import { cn } from "../../lib/utils/cn";
import { Button } from "../ui/Button";
import { MOOD_OPTIONS } from "./constants";
import { MoodToken } from "./types";

type MoodBadgeProps = {
  moodId: MoodToken;
  selected: boolean;
  readOnly?: boolean;
  onSelect?: (moodId: MoodToken) => void;
};

export default function MoodBadge({
  moodId,
  selected,
  readOnly,
  onSelect,
}: MoodBadgeProps) {
  const mood = MOOD_OPTIONS.find((option) => option.id === moodId);
  if (!mood) return null;

  if (readOnly && !selected) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={readOnly}
      aria-pressed={selected}
      onClick={() => onSelect?.(moodId)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all sm:text-sm bg-brand-background",
        selected
          ? "border-brand-accent ring-2 ring-brand-accent font-bold"
          : "border-brand-accent/50 text-brand-text/80",
        readOnly ? "cursor-default" : "cursor-pointer",
      )}
    >
      <span
        className={cn("size-2.5 shrink-0 rounded-full", mood.colorClass)}
        aria-hidden
      />
      {mood.label}
    </Button>
  );
}
