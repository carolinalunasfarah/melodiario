import type { SpotifyTrack } from "./types";
import { WritableDiaryEntryFields } from "../supabase/types";

export type DiarySpotifyFields = Pick<
  WritableDiaryEntryFields,
  | "spotify_track_id"
  | "spotify_song_title"
  | "spotify_song_artist"
  | "spotify_song_album_cover"
  | "spotify_external_url"
>;

export function formatTrackArtists(track: SpotifyTrack): string {
  return track.artists.map((artist) => artist.name).join(", ");
}

export function getTrackAlbumCover(track: SpotifyTrack): string | null {
  return track.album.images[0]?.url ?? null;
}

/** Maps a search result to diary form fields */
export function diaryFieldsFromTrack(track: SpotifyTrack): DiarySpotifyFields {
  return {
    spotify_track_id: track.id,
    spotify_song_title: track.name,
    spotify_song_artist: formatTrackArtists(track),
    spotify_song_album_cover: getTrackAlbumCover(track) ?? "",
    spotify_external_url: track.external_urls.spotify,
  };
}
