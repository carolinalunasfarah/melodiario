"use client";

import { useState, type SyntheticEvent } from "react";
import { isPast, isToday } from "date-fns";
import { toDateKey } from "@/src/modules/utils";
import {
  diaryFieldsFromTrack,
  formatTrackArtists,
  getTrackAlbumCover,
} from "@/src/modules/lib/spotify/utils";
import type { SpotifyTrack } from "@/src/modules/lib/spotify/types";
import type { DiaryEntryUpdatePayload } from "@/src/modules/lib/auth/types";
import type { WritableDiaryEntryFields } from "@/src/modules/lib/supabase/types";
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
  Separator,
} from "@/src/modules/components/ui";

type DiaryEntryFormProps = DiarySectionProps & {
  isEditing: boolean;
  onEditingChange: (editing: boolean) => void;
  onCreate: (entry: WritableDiaryEntryFields) => void;
  onUpdate: (payload: DiaryEntryUpdatePayload) => void;
  isPending: boolean;
  formError?: string;
};

export default function DiaryEntryForm({
  selectedDate,
  entry,
  isEditing,
  onEditingChange,
  onCreate,
  onUpdate,
  isPending,
  formError,
}: DiaryEntryFormProps) {
  const [songQuery, setSongQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [createMood, setCreateMood] = useState<MoodToken | null>(null);
  const [createComment, setCreateComment] = useState("");
  const [editMood, setEditMood] = useState<MoodToken | null>(null);
  const [editComment, setEditComment] = useState("");

  const canCreate = isToday(selectedDate) && !entry;
  const canEditEntry = Boolean(entry) && !canCreate;
  const albumCover =
    entry?.spotify_song_album_cover ??
    (selectedTrack ? getTrackAlbumCover(selectedTrack) : null);
  const spotifyExternalUrl =
    entry?.spotify_external_url ?? selectedTrack?.external_urls.spotify ?? null;
  const songTitle =
    entry?.spotify_song_title ?? selectedTrack?.name ?? "la canción";

  const hasEditChanges =
    isEditing &&
    entry &&
    editMood !== null &&
    (editMood !== entry.mood ||
      (editComment.trim() || null) !== (entry.comment?.trim() || null));

  function handleSongQueryChange(value: string) {
    setSongQuery(value);
    setSelectedTrack(null);
  }

  function handleTrackSelect(track: SpotifyTrack) {
    setSelectedTrack(track);
    setSongQuery(`${track.name} — ${formatTrackArtists(track)}`);
  }

  function startEditing() {
    if (!entry) return;
    setEditMood(entry.mood);
    setEditComment(entry.comment ?? "");
    onEditingChange(true);
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (canCreate) {
      if (!selectedTrack || !createMood) return;

      const payload = {
        date: toDateKey(selectedDate),
        mood: createMood,
        comment: createComment.trim() || null,
        ...diaryFieldsFromTrack(selectedTrack),
      };

      onCreate(payload);
      return;
    }

    if (isEditing && entry && editMood) {
      onUpdate({
        entryId: entry.id,
        mood: editMood,
        comment: editComment.trim() || null,
      });
    }
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
                selected={createMood === option.id}
                onSelect={setCreateMood}
              />
            ))
          ) : isEditing ? (
            MOOD_OPTIONS.map((option) => (
              <DiaryMoodBadge
                key={option.id}
                moodId={option.id}
                selected={editMood === option.id}
                onSelect={setEditMood}
              />
            ))
          ) : entry?.mood ? (
            <DiaryMoodBadge moodId={entry.mood} selected readOnly />
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <Label htmlFor="comment">Nota del día (opcional)</Label>
        {canCreate || isEditing ? (
          <>
            <Textarea
              id="comment"
              name="comment"
              value={canCreate ? createComment : editComment}
              maxLength={JOURNAL_MAX_LENGTH}
              onChange={(event) =>
                (canCreate ? setCreateComment : setEditComment)(
                  event.target.value,
                )
              }
              placeholder="Algo breve que quieras registrar..."
            />
            <p className="text-right text-xs text-brand-text/60">
              {(canCreate ? createComment : editComment).length}/
              {JOURNAL_MAX_LENGTH}
            </p>
          </>
        ) : (
          <p className="rounded-xl border border-brand-accent/20 bg-brand-background/20 px-3 py-2.5 text-sm leading-relaxed text-brand-text/75 italic">
            {entry?.comment || "No se escribió ninguna nota."}
          </p>
        )}
      </div>

      <Separator className="bg-brand-accent/20" />

      <div className="pt-2">
        {formError ? <ErrorMessage>{formError}</ErrorMessage> : null}
        {canCreate ? (
          <Button
            type="submit"
            className="w-full"
            disabled={!selectedTrack || !createMood || isPending}
          >
            {isPending ? "Agregando..." : "Agregar"}
          </Button>
        ) : isEditing ? (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onEditingChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!hasEditChanges || !editMood || isPending}
            >
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        ) : canEditEntry ? (
          <Button type="button" className="w-full" onClick={startEditing}>
            Editar registro
          </Button>
        ) : null}
      </div>
    </form>
  );
}
