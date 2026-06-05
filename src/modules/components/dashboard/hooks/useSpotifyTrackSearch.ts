"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { searchSpotifyTracks } from "@/src/modules/actions/spotify";
import type { SpotifyTrack } from "@/src/modules/lib/spotify/types";

type UseSpotifyTrackSearchOptions = {
  enabled: boolean;
  query: string;
};

export function useSpotifyTrackSearch({
  enabled,
  query,
}: UseSpotifyTrackSearchOptions) {
  const [results, setResults] = useState<SpotifyTrack[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, startSearchTransition] = useTransition();
  const requestId = useRef(0);

  const normalizedQuery = query.trim();
  const shouldSearch = enabled && normalizedQuery.length >= 2;
  const visibleResults = shouldSearch ? results : [];

  useEffect(() => {
    if (!shouldSearch) return;

    const currentRequestId = ++requestId.current;
    const timeout = setTimeout(() => {
      setError(null);

      startSearchTransition(() => {
        void searchSpotifyTracks(normalizedQuery).then((result) => {
          if (currentRequestId !== requestId.current) return;

          if (result.ok) {
            setResults(result.tracks);
          } else {
            setResults([]);
            setError(result.error);
          }
        });
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
      requestId.current += 1;
    };
  }, [normalizedQuery, shouldSearch, startSearchTransition]);

  function resetSearch() {
    setResults([]);
    setError(null);
  }

  return {
    visibleResults,
    isSearching: isSearching && shouldSearch,
    searchError: shouldSearch ? error : null,
    resetSearch,
  };
}
