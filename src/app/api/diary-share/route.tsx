import { ImageResponse } from "next/og";
import { parse } from "date-fns";
import { auth } from "@/src/modules/lib/auth/auth";
import { getDiaryEntryByUserIdAndDate } from "@/src/modules/lib/supabase/data-service";
import {
  DIARY_SHARE_CARD_HEIGHT,
  DIARY_SHARE_CARD_WIDTH,
} from "@/src/modules/components/dashboard/constants";
import { DiaryShareOgContent } from "@/src/modules/components/dashboard";
import {
  fetchAsDataUrl,
  loadGoogleFont,
} from "@/src/modules/components/dashboard/utils";
import { SHARE_BACKGROUND_SRC } from "@/src/modules/components/dashboard/utils/share";
import { formatDateStringCapitalized } from "@/src/modules/utils";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("No autorizado.", { status: 401 });
  }

  const dateKey = new URL(request.url).searchParams.get("date");
  if (!dateKey) {
    return new Response("Falta el parámetro date.", { status: 400 });
  }

  const entry = await getDiaryEntryByUserIdAndDate(session.user.id, dateKey);
  if (!entry) {
    return new Response("No se encontró el registro.", { status: 404 });
  }

  const origin = new URL(request.url).origin;
  const selectedDate = parse(dateKey, "yyyy-MM-dd", new Date());
  const dateLabel = formatDateStringCapitalized(selectedDate);

  const [
    interMedium,
    interSemiBold,
    interBold,
    backgroundSrc,
    albumCoverSrc,
    spotifyLogoSrc,
    melodiarioLogoSrc,
  ] = await Promise.all([
    loadGoogleFont("Inter", 500),
    loadGoogleFont("Inter", 600),
    loadGoogleFont("Inter", 700),
    fetchAsDataUrl(
      `${origin}${SHARE_BACKGROUND_SRC[entry.mood]}`,
      "image/svg+xml",
    ),
    fetchAsDataUrl(entry.spotify_song_album_cover, "image/jpeg"),
    fetchAsDataUrl(`${origin}/spotify_black_logo.svg`, "image/svg+xml"),
    fetchAsDataUrl(`${origin}/melodiario_logo.svg`, "image/svg+xml"),
  ]);

  return new ImageResponse(
    <DiaryShareOgContent
      entry={entry}
      dateLabel={dateLabel}
      assets={{
        backgroundSrc,
        albumCoverSrc,
        spotifyLogoSrc,
        melodiarioLogoSrc,
      }}
    />,
    {
      width: DIARY_SHARE_CARD_WIDTH,
      height: DIARY_SHARE_CARD_HEIGHT,
      fonts: [
        {
          name: "Inter",
          data: interMedium,
          weight: 500,
          style: "normal",
        },
        {
          name: "Inter",
          data: interSemiBold,
          weight: 600,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
