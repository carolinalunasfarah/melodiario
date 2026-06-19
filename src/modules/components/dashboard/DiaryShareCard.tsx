"use client";

/* eslint-disable @next/next/no-img-element -- share card preview uses native img */
import { useState } from "react";
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { formatDateStringCapitalized } from "@/src/modules/utils";
import { cn } from "@/src/modules/utils/styles";
import { Skeleton } from "@/src/modules/components/ui";
import {
  DIARY_SHARE_CARD_HEIGHT,
  DIARY_SHARE_CARD_WIDTH,
  DIARY_SHARE_PADDING,
  DIARY_SHARE_SECTION_GAP,
} from "./constants";
import { getProxiedImageUrl, getShareBackgroundSrc } from "./utils/share";

type DiaryShareCardProps = {
  entry: DiaryEntry;
  selectedDate: Date;
};

export default function DiaryShareCard({
  entry,
  selectedDate,
}: DiaryShareCardProps) {
  const proxiedCoverUrl = entry.spotify_song_album_cover
    ? getProxiedImageUrl(entry.spotify_song_album_cover)
    : null;
  const [loadedCoverUrl, setLoadedCoverUrl] = useState<string | null>(null);
  const coverLoaded =
    proxiedCoverUrl !== null && loadedCoverUrl === proxiedCoverUrl;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: DIARY_SHARE_CARD_WIDTH,
        height: DIARY_SHARE_CARD_HEIGHT,
      }}
    >
      <img
        src={getShareBackgroundSrc(entry.mood)}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-fill"
      />

      <div
        className="relative flex h-full flex-col"
        style={{ padding: DIARY_SHARE_PADDING }}
      >
        <div className="mb-12 shrink-0">
          <p className="m-0 text-3xl font-semibold tracking-[0.12em] text-brand-accent uppercase">
            Diario
          </p>
          <h2 className="mt-3 mb-0 text-2xl leading-tight font-semibold">
            {formatDateStringCapitalized(selectedDate)}
          </h2>
        </div>

        <div
          className="shrink-0"
          style={{ marginBottom: DIARY_SHARE_SECTION_GAP }}
        >
          <p className="mt-0 mb-4 text-3xl font-semibold tracking-[0.08em] uppercase">
            Canción del día
          </p>
          <p
            className="m-0 line-clamp-5 text-2xl leading-[1.15] font-bold"
            title={`${entry.spotify_song_title} — ${entry.spotify_song_artist}`}
          >
            {entry.spotify_song_title} —{" "}
            <span className="font-medium text-brand-text/80">
              {entry.spotify_song_artist}
            </span>
          </p>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center">
          {proxiedCoverUrl ? (
            <div className="relative aspect-square h-full max-w-full overflow-hidden rounded-2xl bg-brand-background/45">
              {!coverLoaded ? (
                <Skeleton className="absolute inset-0 rounded-2xl bg-brand-background/60" />
              ) : null}
              <img
                src={proxiedCoverUrl}
                alt={`Carátula de ${entry.spotify_song_title}`}
                onLoad={() => setLoadedCoverUrl(proxiedCoverUrl)}
                className={cn(
                  "size-full rounded-2xl object-cover transition-opacity duration-300",
                  coverLoaded ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          ) : null}
        </div>

        <footer
          className="flex shrink-0 justify-between gap-3 text-2xl font-semibold text-brand-background"
          style={{ marginTop: DIARY_SHARE_SECTION_GAP }}
        >
          <div className="flex items-center gap-3">
            <img
              src="/spotify_black_logo.svg"
              alt="Spotify black logo"
              width={36}
              height={36}
            />
            <span>Spotify</span>
          </div>

          <div className="flex items-center justify-center gap-3.5">
            <span>melodiario.vercel.app</span>
            <img
              src="/melodiario_logo.svg"
              alt="Melodiario logo"
              width={36}
              height={36}
              className="rounded-lg object-cover"
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
