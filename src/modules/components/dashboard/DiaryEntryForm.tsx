"use client";

import { useState } from "react";
import { isPast, isToday } from "date-fns";
import { Button } from "@/src/modules/components/ui/Button";
import { toDateKey } from "@/src/modules/utils/toDateKey";
import type { SpotifyTrack } from "@/src/modules/lib/spotify/types";
import {
  diaryFieldsFromTrack,
  formatTrackArtists,
  getTrackAlbumCover,
} from "@/src/modules/lib/spotify/utils";
import { JOURNAL_MAX_LENGTH, MOOD_OPTIONS } from "./constants";
import type { DiarySectionProps, MoodToken } from "./types";
import DiaryAlbumCover from "./DiaryAlbumCover";
import DiarySpotifyHiddenInputs from "./DiarySpotifyHiddenInputs";
import DiarySpotifySearch from "./DiarySpotifySearch";
import MoodBadge from "./DiaryMoodBadge";

export default function DiaryEntryForm({
  selectedDate,
  entry,
}: DiarySectionProps) {
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

  return (
    <form
      className="flex h-full flex-col gap-5 p-4 pt-2 sm:p-6 sm:pt-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <input type="hidden" name="date" value={toDateKey(selectedDate)} />
      {entry ? (
        <>
          <DiarySpotifyHiddenInputs track={entry} />
          <input type="hidden" name="mood" value={entry.mood} />
        </>
      ) : (
        selectedTrack && (
          <DiarySpotifyHiddenInputs
            track={diaryFieldsFromTrack(selectedTrack)}
          />
        )
      )}
      {canCreate && mood ? (
        <input type="hidden" name="mood" value={mood} />
      ) : null}

      <div className="flex flex-col gap-3">
        <label
          htmlFor="song-search"
          className="text-xs font-semibold tracking-wide text-brand-text/80 uppercase"
        >
          Canción del día
        </label>
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
        <p className="text-xs font-semibold tracking-wide text-brand-text/80 uppercase">
          {isPast(selectedDate)
            ? "La sintonía de tu día"
            : "Elige una sintonía para tu día"}
        </p>
        <div className="flex flex-wrap gap-2">
          {canCreate ? (
            MOOD_OPTIONS.map((option) => (
              <MoodBadge
                key={option.id}
                moodId={option.id}
                selected={mood === option.id}
                onSelect={setMood}
              />
            ))
          ) : activeMood ? (
            <MoodBadge moodId={activeMood} selected readOnly />
          ) : null}
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
