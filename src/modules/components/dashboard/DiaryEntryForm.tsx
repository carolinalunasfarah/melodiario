"use client";

import { useState } from "react";
import { isPast, isToday } from "date-fns";
import Image from "next/image";
import { Button } from "@/src/modules/components/ui/Button";
import {
  toDateKey,
  searchMockSpotifyTracks,
} from "@/src/modules/data/mockDiaryEntries";
import { JOURNAL_MAX_LENGTH, MOOD_OPTIONS } from "./constants";
import type {
  DiarySectionProps,
  MoodToken,
  SpotifyTrackSelection,
} from "./types";
import MoodBadge from "./DiaryMoodBadge";
import Link from "next/link";

type SpotifyFormFields = Pick<
  SpotifyTrackSelection,
  | "spotify_track_id"
  | "spotify_song_title"
  | "spotify_song_artist"
  | "spotify_song_album_cover"
  | "spotify_external_url"
>;

function SpotifyHiddenInputs({ track }: { track: SpotifyFormFields }) {
  return (
    <>
      <input
        type="hidden"
        name="spotify_track_id"
        value={track.spotify_track_id}
      />
      <input
        type="hidden"
        name="spotify_song_title"
        value={track.spotify_song_title}
      />
      <input
        type="hidden"
        name="spotify_song_artist"
        value={track.spotify_song_artist}
      />
      <input
        type="hidden"
        name="spotify_song_album_cover"
        value={track.spotify_song_album_cover}
      />
      <input
        type="hidden"
        name="spotify_external_url"
        value={track.spotify_external_url}
      />
    </>
  );
}

function DiaryEntryForm({ selectedDate, entry }: DiarySectionProps) {
  const [editingJournal, setEditingJournal] = useState(false);
  const [songQuery, setSongQuery] = useState("");
  const [selectedTrack, setSelectedTrack] =
    useState<SpotifyTrackSelection | null>(null);
  const [mood, setMood] = useState<MoodToken | null>(null);
  const [comment, setComment] = useState(entry?.comment ?? "");

  const today = isToday(selectedDate);
  const canCreate = today && !entry;
  const activeMood = entry?.mood ?? mood;
  const journalEditable = canCreate || editingJournal;
  const trackResults = canCreate ? searchMockSpotifyTracks(songQuery) : [];
  const albumCover =
    entry?.spotify_song_album_cover ??
    selectedTrack?.spotify_song_album_cover ??
    null;
  const spotifyExternalUrl =
    entry?.spotify_external_url ?? selectedTrack?.spotify_external_url ?? null;

  function handleSongQueryChange(value: string) {
    setSongQuery(value);
    setSelectedTrack(null);
  }

  function handleTrackSelect(track: SpotifyTrackSelection) {
    setSelectedTrack(track);
    setSongQuery(`${track.spotify_song_title} — ${track.spotify_song_artist}`);
  }

  return (
    <form
      className="flex h-full flex-col gap-5 p-4 pt-2 sm:p-6 sm:pt-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <input type="hidden" name="date" value={toDateKey(selectedDate)} />
      {entry ? (
        <>
          <SpotifyHiddenInputs track={entry} />
          <input type="hidden" name="mood" value={entry.mood} />
        </>
      ) : (
        selectedTrack && <SpotifyHiddenInputs track={selectedTrack} />
      )}
      {canCreate && mood && <input type="hidden" name="mood" value={mood} />}

      <div className="flex flex-col gap-3">
        <label
          htmlFor="song-search"
          className="text-xs font-semibold tracking-wide text-brand-text/80 uppercase"
        >
          Canción del día
        </label>
        {canCreate ? (
          <>
            <div className="relative">
              <input
                id="song-search"
                type="search"
                value={songQuery}
                onChange={(event) => handleSongQueryChange(event.target.value)}
                placeholder="Buscar en Spotify..."
                autoComplete="off"
                className="w-full rounded-xl border border-brand-accent/20 bg-brand-background/40 py-2.5 pr-11 pl-3 text-sm text-brand-text placeholder:text-brand-text/40 focus:border-brand-accent focus:outline-none"
              />
              <Image
                src="/spotify_white_logo.svg"
                alt="Spotify logo"
                width={21}
                height={21}
                aria-hidden
                className="absolute top-1/2 right-3 min-h-[21px] min-w-[21px] -translate-y-1/2"
              />
            </div>
            {trackResults.length > 0 && !selectedTrack ? (
              <ul
                className="overflow-hidden rounded-xl border border-brand-accent/20 bg-brand-background/60"
                role="listbox"
                aria-label="Resultados de búsqueda"
              >
                {trackResults.map((track) => (
                  <li key={track.spotify_track_id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={false}
                      onClick={() => handleTrackSelect(track)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-brand-text transition-colors hover:bg-brand-accent/10"
                    >
                      <span
                        className="size-10 shrink-0 rounded-lg border border-brand-accent/20 bg-brand-background/40 bg-cover bg-center"
                        style={{
                          backgroundImage: `url("${track.spotify_song_album_cover}")`,
                        }}
                        aria-hidden
                      />
                      <span>
                        <span className="block font-medium">
                          {track.spotify_song_title}
                        </span>
                        <span className="block text-brand-text">
                          {track.spotify_song_artist}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <p className="text-sm font-medium text-brand-text">
            {entry?.spotify_song_title ?? "Ninguna canción registrada"}
            {entry?.spotify_song_artist ? (
              <>
                {" "}
                —{" "}
                <span className="text-brand-text/80">
                  {entry.spotify_song_artist}
                </span>
              </>
            ) : null}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        {albumCover ? (
          <>
            <div
              className="aspect-square w-full max-w-[200px] rounded-2xl border border-brand-accent/20 bg-brand-background/40 bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url("${albumCover}")` }}
              role="img"
              aria-label={`Carátula de ${entry?.spotify_song_title ?? selectedTrack?.spotify_song_title ?? "la canción"}`}
            />
            {spotifyExternalUrl ? (
              <Link
                href={spotifyExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-accent underline-offset-4 hover:underline"
              >
                Escuchar en Spotify
              </Link>
            ) : null}
          </>
        ) : (
          <div className="flex aspect-square w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-accent/20 bg-brand-background/20 p-4 text-center">
            <span className="mb-1 text-2xl" aria-hidden>
              🎵
            </span>
            <p className="text-[11px] text-brand-text/50">
              La carátula aparecerá aquí
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-wide text-brand-text/80 uppercase">
          {isPast(selectedDate)
            ? "La sintonía de tu día"
            : "Elige una sintonía para tu día"}
        </p>
        <div className="flex flex-wrap gap-2">
          {canCreate
            ? MOOD_OPTIONS.map((option) => (
                <MoodBadge
                  key={option.id}
                  moodId={option.id}
                  selected={mood === option.id}
                  onSelect={setMood}
                />
              ))
            : activeMood && <MoodBadge moodId={activeMood} selected readOnly />}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <label
          htmlFor="comment"
          className="text-xs font-semibold tracking-wide text-brand-text/80 uppercase"
        >
          Bitácora privada (opcional)
        </label>
        {journalEditable ? (
          <>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              maxLength={JOURNAL_MAX_LENGTH}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Cuéntale a tu diario qué pasó hoy..."
              className="min-h-24 w-full resize-none rounded-xl border border-brand-accent/20 bg-brand-background/40 px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-text/40 focus:border-brand-accent focus:outline-none"
            />
            <p className="text-right text-xs text-brand-text/45">
              {comment.length}/{JOURNAL_MAX_LENGTH}
            </p>
          </>
        ) : (
          <p className="rounded-xl border border-brand-accent/10 bg-brand-background/20 px-3 py-2.5 text-sm leading-relaxed text-brand-text/75 italic">
            {entry?.comment || "No se escribió ninguna bitácora."}
          </p>
        )}
      </div>

      <div className="border-t border-brand-accent/10 pt-4">
        {canCreate ? (
          <Button
            type="submit"
            className="w-full"
            disabled={!selectedTrack || !mood}
          >
            Agregar
          </Button>
        ) : editingJournal ? (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setComment(entry?.comment ?? "");
                setEditingJournal(false);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Guardar
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            className="w-full"
            onClick={() => setEditingJournal(true)}
          >
            Editar bitácora
          </Button>
        )}
      </div>
    </form>
  );
}

export default DiaryEntryForm;
