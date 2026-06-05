import { cn } from "../../lib/cn";
import { MOOD_OPTIONS } from "./constants";
import { MoodToken } from "./types";

type MoodBadgeProps = {
  moodId: MoodToken;
  selected: boolean;
  readOnly?: boolean;
  onSelect?: (moodId: MoodToken) => void;
};

function MoodBadge({ moodId, selected, readOnly, onSelect }: MoodBadgeProps) {
  const mood = MOOD_OPTIONS.find((option) => option.id === moodId);
  if (!mood) return null;

  if (readOnly && !selected) return null;

  return (
    <button
      type="button"
      disabled={readOnly}
      aria-pressed={selected}
      onClick={() => onSelect?.(moodId)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all sm:text-sm",
        selected
          ? "border-brand-accent bg-brand-background/80 text-brand-text ring-2 ring-brand-accent"
          : "border-brand-accent/20 bg-brand-background/40 text-brand-text/80 hover:border-brand-accent/40",
        readOnly ? "cursor-default" : "cursor-pointer",
      )}
    >
      <span
        className={cn("size-2.5 shrink-0 rounded-full", mood.colorClass)}
        aria-hidden
      />
      {mood.label}
    </button>
  );
}

export default MoodBadge;
