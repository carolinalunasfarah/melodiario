export type MoodToken =
  | "sparkling"
  | "chill"
  | "melancholic"
  | "inspired"
  | "rage";

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
