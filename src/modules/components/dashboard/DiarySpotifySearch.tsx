"use client";

import Image from "next/image";
import { XIcon } from "lucide-react";
import {
  formatTrackArtists,
  getTrackAlbumCover,
} from "@/src/modules/lib/spotify/utils";
import type { SpotifyTrack } from "@/src/modules/lib/spotify/types";
import { useSpotifyTrackSearch } from "./hooks/useSpotifyTrackSearch";
import { Input, ErrorMessage, Button } from "@/src/modules/components/ui";
import { cn } from "@/src/modules/utils/styles";

type DiarySpotifySearchProps = {
  query: string;
  selectedTrack: SpotifyTrack | null;
  onQueryChange: (value: string) => void;
  onTrackSelect: (track: SpotifyTrack) => void;
};

export default function DiarySpotifySearch({
  query,
  selectedTrack,
  onQueryChange,
  onTrackSelect,
}: DiarySpotifySearchProps) {
  const { visibleResults, isSearching, searchError, resetSearch } =
    useSpotifyTrackSearch({
      enabled: !selectedTrack,
      query,
    });

  function handleQueryChange(value: string) {
    resetSearch();
    onQueryChange(value);
  }

  function handleTrackSelect(track: SpotifyTrack) {
    resetSearch();
    onTrackSelect(track);
  }

  return (
    <>
      <div className="relative">
        <Input
          id="song-search"
          type="text"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder="Buscar en Spotify..."
          autoComplete="off"
          className={cn(query ? "pr-16" : "pr-11")}
        />
        {query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Limpiar búsqueda"
            onClick={() => handleQueryChange("")}
            className="absolute top-1/2 right-9 size-7 -translate-y-1/2 hover:bg-brand-accent/20"
          >
            <XIcon className="size-4" />
          </Button>
        ) : null}
        <Image
          src="/spotify_white_logo.svg"
          alt="Spotify white logo"
          width={21}
          height={21}
          aria-hidden
          className="absolute top-1/2 right-3 -translate-y-1/2"
        />
      </div>
      {isSearching ? (
        <p className="text-sm text-brand-text/80">Buscando...</p>
      ) : null}
      {searchError ? <ErrorMessage>{searchError}</ErrorMessage> : null}
      {visibleResults.length > 0 ? (
        <ul className="overflow-hidden rounded-xl border border-brand-accent/20 bg-brand-background/60">
          {visibleResults.map((track) => {
            const albumCoverUrl = getTrackAlbumCover(track);

            return (
              <li key={track.id}>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => handleTrackSelect(track)}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-accent/10 rounded-none h-full"
                >
                  {albumCoverUrl ? (
                    <div className="relative size-10 overflow-hidden rounded-lg">
                      <Image
                        src={albumCoverUrl}
                        alt="Album cover"
                        fill
                        sizes="40px"
                        className="object-cover"
                        aria-hidden
                      />
                    </div>
                  ) : (
                    <span
                      className="size-10 shrink-0 rounded-lg border border-brand-accent/20 bg-brand-background/40"
                      aria-hidden
                    />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-light">
                      {track.name}
                    </span>
                    <span className="block truncate">
                      {formatTrackArtists(track)}
                    </span>
                  </span>
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
