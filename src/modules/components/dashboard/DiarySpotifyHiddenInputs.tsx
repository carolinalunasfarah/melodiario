import type { DiarySpotifyFields } from "@/src/modules/lib/spotify/utils";

export default function DiarySpotifyHiddenInputs({
  track,
}: {
  track: DiarySpotifyFields;
}) {
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
