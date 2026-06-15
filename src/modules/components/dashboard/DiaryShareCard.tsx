"use client";

/* eslint-disable @next/next/no-img-element -- html-to-image export requires native img */
import { forwardRef } from "react";
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { formatDateStringCapitalized } from "@/src/modules/utils";
import { DIARY_SHARE_CARD_HEIGHT, DIARY_SHARE_CARD_WIDTH } from "./constants";
import DiaryShareBackground from "./DiaryShareBackground";

type DiaryShareCardProps = {
  entry: DiaryEntry;
  selectedDate: Date;
};

const DiaryShareCard = forwardRef<HTMLDivElement, DiaryShareCardProps>(
  function DiaryShareCard({ entry, selectedDate }, ref) {
    return (
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: DIARY_SHARE_CARD_WIDTH,
          height: DIARY_SHARE_CARD_HEIGHT,
        }}
      >
        <DiaryShareBackground mood={entry.mood} />

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
            <img
              src={entry.spotify_song_album_cover}
              alt={`Carátula de ${entry.spotify_song_title}`}
              crossOrigin="anonymous"
              className="size-full rounded-2xl object-cover"
            />
          </div>

          <footer className="flex justify-between gap-3 text-2xl font-semibold text-brand-background">
            <div className="mb-auto flex items-center gap-3">
              <img
                src="/spotify_black_logo.svg"
                alt="Spotify black logo"
                width={36}
                height={36}
              />
              <span>Spotify</span>
            </div>

            <div className="flex items-center justify-center gap-3.5">
              <span>Melodiario</span>
              <img
                src="/icon.png"
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
  },
);

export default DiaryShareCard;
