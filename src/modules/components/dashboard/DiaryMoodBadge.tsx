import { cn } from "@/src/modules/utils/styles";
import { Button } from "@/src/modules/components/ui/Button";
import { MOOD_OPTIONS } from "./constants";
import { MoodToken } from "./types";

type DiaryMoodBadgeProps = {
  moodId: MoodToken;
  selected: boolean;
  readOnly?: boolean;
  onSelect?: (moodId: MoodToken) => void;
};

export default function DiaryMoodBadge({
  moodId,
  selected,
  readOnly,
  onSelect,
}: DiaryMoodBadgeProps) {
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
