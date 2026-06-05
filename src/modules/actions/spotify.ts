"use server";

import type {
  SpotifySearchTracksResponse,
  SpotifyTokenResponse,
  SpotifyTrack,
} from "@/src/modules/lib/spotify/types";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search";
const DEFAULT_MARKET = "CL";
const SEARCH_LIMIT = 10;
const MIN_QUERY_LENGTH = 2;

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

export type SpotifySearchResult =
  | { ok: true; tracks: SpotifyTrack[] }
  | { ok: false; error: string };

function getSpotifyCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET environment variables.",
    );
  }

  return { clientId, clientSecret };
}

async function getSpotifyAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && now < cachedToken.expiresAt) {
    return cachedToken.accessToken;
  }

  const { clientId, clientSecret } = getSpotifyCredentials();
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed (${response.status}).`);
  }

  const data = (await response.json()) as SpotifyTokenResponse;

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: now + data.expires_in * 1000 - 60_000,
  };

  return cachedToken.accessToken;
}

export async function searchSpotifyTracks(
  query: string,
): Promise<SpotifySearchResult> {
  const normalized = query.trim();

  if (normalized.length < MIN_QUERY_LENGTH) {
    return { ok: true, tracks: [] };
  }

  try {
    const accessToken = await getSpotifyAccessToken();
    const market = process.env.SPOTIFY_MARKET ?? DEFAULT_MARKET;

    const params = new URLSearchParams({
      q: normalized,
      type: "track",
      limit: String(SEARCH_LIMIT),
      market,
    });

    const response = await fetch(
      `${SPOTIFY_SEARCH_URL}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Spotify search failed (${response.status}).`);
    }

    const data = (await response.json()) as SpotifySearchTracksResponse;

    return { ok: true, tracks: data.tracks.items };
  } catch (error) {
    console.error("[searchSpotifyTracks]", error);
    return {
      ok: false,
      error: "No se pudo buscar en Spotify. Intenta de nuevo.",
    };
  }
}
