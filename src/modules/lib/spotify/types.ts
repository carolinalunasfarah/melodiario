export type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

export type SpotifyArtist = {
  id: string;
  name: string;
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  images: SpotifyImage[];
};

export type SpotifyTrack = {
  id: string;
  name: string;
  external_urls: { spotify: string };
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
};

export type SpotifySearchTracksResponse = {
  tracks: {
    items: SpotifyTrack[];
  };
};

export type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
