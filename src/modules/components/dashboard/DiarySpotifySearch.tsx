"use client";

import Image from "next/image";
import type { SpotifyTrack } from "@/src/modules/lib/spotify/types";
import {
  formatTrackArtists,
  getTrackAlbumCover,
} from "@/src/modules/lib/spotify/utils";
import { useSpotifyTrackSearch } from "./hooks/useSpotifyTrackSearch";
import { Input } from "@/src/modules/components/ui/Input";

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
          type="search"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder="Buscar en Spotify..."
          autoComplete="off"
          className="pr-11"
        />
        <Image
          src="/spotify_white_logo.svg"
          alt=""
          width={21}
          height={21}
          aria-hidden
          className="absolute top-1/2 right-3 min-h-[21px] min-w-[21px] -translate-y-1/2"
        />
      </div>
      {isSearching ? (
        <p className="text-xs text-brand-text/50">Buscando...</p>
      ) : null}
      {searchError ? (
        <p className="text-xs text-system-error/90">{searchError}</p>
      ) : null}
      {visibleResults.length > 0 ? (
        <ul
          className="overflow-hidden rounded-xl border border-brand-accent/20 bg-brand-background/60"
          role="listbox"
          aria-label="Resultados de búsqueda"
        >
          {visibleResults.map((track) => {
            const albumCoverUrl = getTrackAlbumCover(track);

            return (
              <li key={track.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  onClick={() => handleTrackSelect(track)}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-brand-text transition-colors hover:bg-brand-accent/10"
                >
                  {albumCoverUrl ? (
                    <div className="relative size-10 overflow-hidden rounded-lg">
                      <Image
                        src={albumCoverUrl}
                        alt=""
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
                    <span className="block truncate font-medium">
                      {track.name}
                    </span>
                    <span className="block truncate text-brand-text">
                      {formatTrackArtists(track)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
