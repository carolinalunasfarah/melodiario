export type MoodToken =
  | "sparkling"
  | "chill"
  | "melancholic"
  | "inspired"
  | "rage";

/** Shape returned by Spotify search before saving. */
export type SpotifyTrackSelection = {
  spotify_track_id: string;
  spotify_song_title: string;
  spotify_song_artist: string;
  spotify_song_album_cover: string;
  spotify_external_url: string;
};

/** Matches `diary_entries` (without `user_id`, set server-side). */
export type DiaryEntry = {
  date: string;
  mood: MoodToken;
  comment?: string;
  spotify_track_id: string;
  spotify_song_title: string;
  spotify_song_artist: string;
  spotify_song_album_cover: string;
  spotify_external_url: string;
};

export type DiarySectionProps = {
  selectedDate: Date;
  entry: DiaryEntry | null;
};
