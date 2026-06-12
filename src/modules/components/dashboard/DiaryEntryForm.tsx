"use client";

import { startTransition, useState, type SyntheticEvent } from "react";
import { isPast, isToday } from "date-fns";
import { toDateKey } from "@/src/modules/utils";
import {
  diaryFieldsFromTrack,
  formatTrackArtists,
  getTrackAlbumCover,
} from "@/src/modules/lib/spotify/utils";
import type { SpotifyTrack } from "@/src/modules/lib/spotify/types";
import { JOURNAL_MAX_LENGTH, MOOD_OPTIONS } from "./constants";
import type { DiarySectionProps, MoodToken } from "./types";
import {
  DiarySpotifySearch,
  DiaryMoodBadge,
  DiaryAlbumCover,
} from "@/src/modules/components/dashboard";
import {
  Button,
  Textarea,
  Label,
  ErrorMessage,
} from "@/src/modules/components/ui";
import type { WritableDiaryEntryFields } from "@/src/modules/lib/supabase/types";

type DiaryEntryFormProps = DiarySectionProps & {
  formAction: (entry: WritableDiaryEntryFields) => void;
  isPending: boolean;
  formError?: string;
};

export default function DiaryEntryForm({
  selectedDate,
  entry,
  formAction,
  isPending,
  formError,
}: DiaryEntryFormProps) {
  const [editingJournal, setEditingJournal] = useState(false);
  const [songQuery, setSongQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [mood, setMood] = useState<MoodToken | null>(null);
  const [comment, setComment] = useState(entry?.comment ?? "");

  const canCreate = isToday(selectedDate) && !entry;
  const activeMood = entry?.mood ?? mood;
  const journalEditable = canCreate || editingJournal;
  const albumCover =
    entry?.spotify_song_album_cover ??
    (selectedTrack ? getTrackAlbumCover(selectedTrack) : null);
  const spotifyExternalUrl =
    entry?.spotify_external_url ?? selectedTrack?.external_urls.spotify ?? null;
  const songTitle =
    entry?.spotify_song_title ?? selectedTrack?.name ?? "la canción";

  function handleSongQueryChange(value: string) {
    setSongQuery(value);
    setSelectedTrack(null);
  }

  function handleTrackSelect(track: SpotifyTrack) {
    setSelectedTrack(track);
    setSongQuery(`${track.name} — ${formatTrackArtists(track)}`);
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canCreate) return;
    if (!selectedTrack || !mood) return;
    const payload = {
      date: toDateKey(selectedDate),
      mood,
      comment: comment.trim() || null,
      ...diaryFieldsFromTrack(selectedTrack),
    };
    startTransition(() => {
      formAction(payload);
    });
  }

  return (
    <form
      className="flex h-full flex-col gap-5 p-4 pt-2 sm:p-6 sm:pt-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <Label htmlFor="song-search">Canción del día</Label>
        {canCreate ? (
          <DiarySpotifySearch
            query={songQuery}
            selectedTrack={selectedTrack}
            onQueryChange={handleSongQueryChange}
            onTrackSelect={handleTrackSelect}
          />
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
        <DiaryAlbumCover
          albumCover={albumCover}
          title={songTitle}
          spotifyExternalUrl={spotifyExternalUrl}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="mood">
          {isPast(selectedDate)
            ? "La sintonía de tu día"
            : "Elige una sintonía para tu día"}
        </Label>
        <div className="flex flex-wrap gap-2">
          {canCreate ? (
            MOOD_OPTIONS.map((option) => (
              <DiaryMoodBadge
                key={option.id}
                moodId={option.id}
                selected={mood === option.id}
                onSelect={setMood}
              />
            ))
          ) : activeMood ? (
            <DiaryMoodBadge moodId={activeMood} selected readOnly />
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <Label htmlFor="comment">Bitácora privada (opcional)</Label>
        {journalEditable ? (
          <>
            <Textarea
              id="comment"
              name="comment"
              value={comment}
              maxLength={JOURNAL_MAX_LENGTH}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Cuéntale a tu diario qué pasó hoy..."
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
        {formError ? <ErrorMessage>{formError}</ErrorMessage> : null}
        {canCreate ? (
          <Button
            type="submit"
            className="w-full"
            disabled={!selectedTrack || !mood || isPending}
          >
            {isPending ? "Agregando..." : "Agregar"}
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
