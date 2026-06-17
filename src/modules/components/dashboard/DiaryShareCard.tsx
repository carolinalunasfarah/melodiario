"use client";

/* eslint-disable @next/next/no-img-element -- html-to-image export requires native img */
import { forwardRef, useEffect, useRef, useState } from "react";
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { formatDateStringCapitalized } from "@/src/modules/utils";
import { cn } from "@/src/modules/utils/styles";
import { Skeleton } from "@/src/modules/components/ui";
import { DIARY_SHARE_CARD_HEIGHT, DIARY_SHARE_CARD_WIDTH } from "./constants";
import DiaryShareBackground from "./DiaryShareBackground";
import { getProxiedImageUrl } from "./utils/share";

type DiaryShareCardProps = {
  entry: DiaryEntry;
  selectedDate: Date;
  forExport?: boolean;
};

const DiaryShareCard = forwardRef<HTMLDivElement, DiaryShareCardProps>(
  function DiaryShareCard({ entry, selectedDate, forExport = false }, ref) {
    const proxiedCoverUrl = entry.spotify_song_album_cover
      ? getProxiedImageUrl(entry.spotify_song_album_cover)
      : null;
    const [coverLoaded, setCoverLoaded] = useState(forExport);
    const coverRef = useRef<HTMLImageElement>(null);
    const coverVisible = forExport || coverLoaded;

    useEffect(() => {
      if (forExport) {
        return;
      }

      setCoverLoaded(false);

      const image = coverRef.current;
      if (image?.complete && image.naturalWidth > 0) {
        setCoverLoaded(true);
      }
    }, [forExport, proxiedCoverUrl]);

    return (
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{
          width: DIARY_SHARE_CARD_WIDTH,
          height: DIARY_SHARE_CARD_HEIGHT,
        }}
      >
        <DiaryShareBackground mood={entry.mood} forExport={forExport} />

        <div className="relative flex h-full flex-col p-12">
          <div className="mb-12">
            <p className="m-0 text-3xl font-semibold tracking-[0.12em] text-brand-accent uppercase">
              Diario
            </p>
            <h2 className="mt-3 mb-0 text-2xl leading-tight font-semibold">
              {formatDateStringCapitalized(selectedDate)}
            </h2>
          </div>

          <div className="mb-10">
            <p className="mt-0 mb-4 text-3xl font-semibold tracking-[0.08em] uppercase">
              Canción del día
            </p>
            <p className="m-0 text-2xl leading-[1.15] font-bold">
              {entry.spotify_song_title} —{" "}
              <span className="font-medium text-brand-text/80">
                {entry.spotify_song_artist}
              </span>
            </p>
          </div>

          <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl bg-brand-background/45">
            {proxiedCoverUrl ? (
              <>
                {!forExport && !coverLoaded ? (
                  <Skeleton className="absolute inset-0 rounded-2xl bg-brand-background/60" />
                ) : null}
                <img
                  ref={coverRef}
                  src={proxiedCoverUrl}
                  alt={`Carátula de ${entry.spotify_song_title}`}
                  onLoad={() => setCoverLoaded(true)}
                  crossOrigin="anonymous"
                  className={cn(
                    "size-full rounded-2xl object-cover transition-opacity duration-300",
                    coverVisible ? "opacity-100" : "opacity-0",
                  )}
                />
              </>
            ) : null}
          </div>

          <footer className="flex justify-between gap-3 text-2xl font-semibold text-brand-background">
            <div className="mb-auto flex items-center gap-3">
              <img
                src="/spotify_black_logo.svg"
                alt="Spotify black logo"
                width={36}
                height={36}
                crossOrigin="anonymous"
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
                crossOrigin="anonymous"
                className="rounded-lg object-cover"
              />
            </div>
          </footer>
        </div>
      </div>
    );
  },
);

export default DiaryShareCard;
