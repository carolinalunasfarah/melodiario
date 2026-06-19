/* eslint-disable @next/next/no-img-element -- share card preview uses native img */
import type { DiaryEntry } from "@/src/modules/lib/supabase/types";
import { BRAND_BACKGROUND_HEX } from "@/src/modules/components/home/constants";
import {
  DIARY_SHARE_CARD_HEIGHT,
  DIARY_SHARE_CARD_WIDTH,
  DIARY_SHARE_PADDING,
  DIARY_SHARE_SECTION_GAP,
} from "./constants";

const BRAND_TEXT = "#f5f2ff";
const BRAND_ACCENT = "#c4b5fd";

type DiaryShareOgAssets = {
  backgroundSrc: string;
  albumCoverSrc: string;
  spotifyLogoSrc: string;
  melodiarioLogoSrc: string;
};

type DiaryShareOgContentProps = {
  entry: DiaryEntry;
  dateLabel: string;
  assets: DiaryShareOgAssets;
};

export function DiaryShareOgContent({
  entry,
  dateLabel,
  assets,
}: DiaryShareOgContentProps) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: DIARY_SHARE_CARD_WIDTH,
        height: DIARY_SHARE_CARD_HEIGHT,
        background: BRAND_BACKGROUND_HEX,
        overflow: "hidden",
      }}
    >
      <img
        src={assets.backgroundSrc}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "fill",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          height: "100%",
          padding: DIARY_SHARE_PADDING,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", marginBottom: 48 }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: BRAND_ACCENT,
              fontFamily: "Inter",
            }}
          >
            Diario
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 24,
              fontWeight: 600,
              color: BRAND_TEXT,
              fontFamily: "Inter",
            }}
          >
            {dateLabel}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: DIARY_SHARE_SECTION_GAP,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              marginBottom: 16,
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: BRAND_TEXT,
              fontFamily: "Inter",
            }}
          >
            Canción del día
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: BRAND_TEXT,
              lineHeight: 1.15,
              fontFamily: "Inter",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {`${entry.spotify_song_title} — ${entry.spotify_song_artist}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            minHeight: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              aspectRatio: "1 / 1",
              height: "100%",
              maxWidth: "100%",
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(10, 5, 27, 0.45)",
            }}
          >
            <img
              src={assets.albumCoverSrc}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: DIARY_SHARE_SECTION_GAP,
            flexShrink: 0,
            fontSize: 24,
            fontWeight: 600,
            color: BRAND_BACKGROUND_HEX,
            fontFamily: "Inter",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={assets.spotifyLogoSrc} alt="" width={36} height={36} />
            <span>Spotify</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>melodiario.vercel.app</span>
            <img
              src={assets.melodiarioLogoSrc}
              alt=""
              width={36}
              height={36}
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
