import type {
  DiaryEntry,
  MoodToken,
  SpotifyTrackSelection,
} from "@/src/modules/components/dashboard/types";
import { format } from "date-fns";

export const MOCK_COVERS = [
  "/cover_1.jpg",
  "/cover_2.jpg",
  "/cover_3.jpg",
  "/cover_4.jpg",
  "/cover_5.jpg",
  "/cover_6.jpg",
  "/cover_7.jpg",
  "/cover_8.jpg",
  "/cover_9.jpg",
  "/cover_10.jpg",
] as const;

const MOODS: MoodToken[] = [
  "sparkling",
  "chill",
  "melancholic",
  "inspired",
  "rage",
];

const MOCK_SONGS = [
  { title: "Golden", artist: "HUNTR/X" },
  { title: "Birds of a Feather", artist: "Billie Eilish" },
  { title: "Die with a Smile", artist: "Lady Gaga & Bruno Mars" },
  { title: "Espresso", artist: "Sabrina Carpenter" },
  { title: "Beautiful Things", artist: "Benson Boone" },
  { title: "Lose Control", artist: "Teddy Swims" },
  { title: "Good Luck, Babe!", artist: "Chappell Roan" },
  { title: "A Bar Song (Tipsy)", artist: "Shaboozey" },
  { title: "Not Like Us", artist: "Kendrick Lamar" },
  { title: "Please Please Please", artist: "Sabrina Carpenter" },
] as const;

export const MOCK_SPOTIFY_TRACKS: SpotifyTrackSelection[] = MOCK_SONGS.map(
  (song, index) => ({
    spotify_track_id: `mock-spotify-track-${index + 1}`,
    song_title: song.title,
    song_artist: song.artist,
    song_album_cover: MOCK_COVERS[index],
  }),
);

const MOCK_COMMENTS = [
  "Un día ligero, la canción me acompañó toda la tarde.",
  "Me costó concentrarme, pero la música me ancló.",
  "Nostalgia bonita, nada urgente.",
  "Salí a caminar y no paré de cantarla.",
  undefined,
  "Risa con amigas y esta canción en repeat.",
  "Día raro, pero la melodía ayudó.",
  undefined,
  "Energía alta de sobra hoy.",
  "Cierre suave para un día largo.",
] as const;

function buildMockEntry(dateKey: string, index: number): DiaryEntry {
  const track = MOCK_SPOTIFY_TRACKS[index % MOCK_SPOTIFY_TRACKS.length];
  const comment = MOCK_COMMENTS[index % MOCK_COMMENTS.length];

  return {
    date: dateKey,
    mood: MOODS[index % MOODS.length],
    spotify_track_id: track.spotify_track_id,
    song_title: track.song_title,
    song_artist: track.song_artist,
    song_album_cover: track.song_album_cover,
    ...(comment ? { comment } : {}),
  };
}

/** Mock entries keyed by local date (YYYY-MM-DD). */
export const MOCK_DIARY_ENTRIES: Record<string, DiaryEntry> = {
  "2026-06-01": buildMockEntry("2026-06-01", 0),
  "2026-06-02": buildMockEntry("2026-06-02", 1),
  "2026-06-04": buildMockEntry("2026-06-04", 3),
  "2026-06-06": buildMockEntry("2026-06-06", 5),
  "2026-06-07": buildMockEntry("2026-06-07", 6),
  "2026-06-08": buildMockEntry("2026-06-08", 7),
  "2026-06-09": buildMockEntry("2026-06-09", 8),
  "2026-06-10": buildMockEntry("2026-06-10", 9),
  "2026-06-12": buildMockEntry("2026-06-12", 2),
  "2026-06-14": buildMockEntry("2026-06-14", 4),
  "2026-06-16": buildMockEntry("2026-06-16", 6),
  "2026-06-18": buildMockEntry("2026-06-18", 8),
  "2026-06-20": buildMockEntry("2026-06-20", 0),
  "2026-06-22": buildMockEntry("2026-06-22", 3),
  "2026-06-24": buildMockEntry("2026-06-24", 5),
  "2026-06-26": buildMockEntry("2026-06-26", 7),
  "2026-06-28": buildMockEntry("2026-06-28", 9),
  "2026-06-30": buildMockEntry("2026-06-30", 1),
  "2026-07-01": buildMockEntry("2026-07-01", 4),
  "2026-07-02": buildMockEntry("2026-07-02", 6),
  "2026-07-03": buildMockEntry("2026-07-03", 8),
};

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function getMockDiaryEntry(date: Date): DiaryEntry | null {
  return MOCK_DIARY_ENTRIES[toDateKey(date)] ?? null;
}

export function getMockCoverForDate(date: Date): string | undefined {
  return getMockDiaryEntry(date)?.song_album_cover;
}

/** Temporary mock until Spotify search is wired. */
export function searchMockSpotifyTracks(
  query: string,
): SpotifyTrackSelection[] {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return [];

  return MOCK_SPOTIFY_TRACKS.filter(
    (track) =>
      track.song_title.toLowerCase().includes(normalized) ||
      track.song_artist.toLowerCase().includes(normalized),
  ).slice(0, 5);
}
