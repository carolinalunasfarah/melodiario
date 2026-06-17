"use client";

import { useId } from "react";
import type { MoodToken } from "./types";
import { BRAND_BACKGROUND_HEX, MOOD_HEX } from "./constants";
import { getMoodShareMutedHex } from "./utils";

type DiaryShareBackgroundProps = {
  mood: MoodToken;
};

const VIEWBOX_WIDTH = 1440;
const VIEWBOX_HEIGHT = 700;

const WAVE_PATHS = {
  back: "M 0,700 L 0,105 C 69.61181724493301,128.61113019580898 139.22363448986601,152.222260391618 209,139 C 278.776365510134,125.777739608382 348.717279285469,75.722088629337 424,55 C 499.282720714531,34.277911370663006 579.9072483682583,42.889385091034015 646,64 C 712.0927516317417,85.11061490896599 763.6537272414979,118.72037100652696 834,126 C 904.3462727585021,133.27962899347304 993.4778426657506,114.22913088285812 1064,96 C 1134.5221573342494,77.77086911714188 1186.4349020954999,60.36310546204054 1246,62 C 1305.5650979045001,63.63689453795946 1372.7825489522502,84.31844726897972 1440,105 L 1440,700 L 0,700 Z",
  mid: "M 0,700 L 0,245 C 64.87255238749569,253.8203366540708 129.74510477499138,262.6406733081416 209,259 C 288.2548952250086,255.35932669185846 381.8921332875301,239.2576434215046 449,225 C 516.1078667124699,210.7423565784954 556.6863620748884,198.32875300583993 625,192 C 693.3136379251116,185.67124699416007 789.3624184129163,185.4273445551357 859,196 C 928.6375815870837,206.5726554448643 971.8639642734458,227.9618687736173 1034,246 C 1096.1360357265542,264.0381312263827 1177.181724493301,278.7251803503951 1248,278 C 1318.818275506699,277.2748196496049 1379.4091377533496,261.1374098248025 1440,245 L 1440,700 L 0,700 Z",
  frontMid:
    "M 0,700 L 0,385 C 58.21779457231193,409.6217794572312 116.43558914462386,434.24355891446237 177,426 C 237.56441085537614,417.75644108553763 300.4754379938165,376.6475437993817 379,378 C 457.5245620061835,379.3524562006183 551.6626588801099,423.16626588801097 618,423 C 684.3373411198901,422.83373411198903 722.8739264857436,378.68739264857436 801,355 C 879.1260735142564,331.31260735142564 996.8416351769154,328.08416351769154 1065,340 C 1133.1583648230846,351.91583648230846 1151.7595328065956,378.9759532806596 1206,389 C 1260.2404671934044,399.0240467193404 1350.1202335967023,392.0120233596702 1440,385 L 1440,700 L 0,700 Z",
  front:
    "M 0,700 L 0,595 C 84.15458605290277,595.9611817244933 168.30917210580554,596.9223634489865 241,609 C 313.69082789419446,621.0776365510135 374.91789762968057,644.271727928547 438,636 C 501.08210237031943,627.728272071453 566.0192373754722,587.9907248368257 628,569 C 689.9807626245278,550.00927516317427 749.0051528684301,551.76537272414976 804,548 C 858.9948471315699,544.23462727585024 909.9601511508074,534.94778426657507 992,545 C 1074.0398488491926,555.05221573342493 1187.1542425283408,584.44349020955 1267,596 C 1346.8457574716592,607.55650979045 1393.4228787358297,601.278254895225 1440,595 L 1440,700 L 0,700 Z",
} as const;

const MOOD_WAVE_OPACITY = {
  back: 0.28,
  mid: 0.42,
} as const;

export default function DiaryShareBackground({
  mood,
}: DiaryShareBackgroundProps) {
  const instanceId = `uid${useId().replace(/:/g, "")}`;
  const moodColor = MOOD_HEX[mood];
  const mutedColor = getMoodShareMutedHex(mood);
  const mutedGradientId = `share-muted-${mood}-${instanceId}`;
  const blendGradientId = `share-blend-${mood}-${instanceId}`;

  return (
    <svg
      data-share-background
      aria-hidden
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 size-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={blendGradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="220"
          x2="0"
          y2={VIEWBOX_HEIGHT}
        >
          <stop offset="0%" stopColor={moodColor} stopOpacity="0" />
          <stop offset="35%" stopColor={moodColor} stopOpacity="0.18" />
          <stop offset="65%" stopColor={mutedColor} stopOpacity="0.38" />
          <stop offset="100%" stopColor={mutedColor} stopOpacity="0.72" />
        </linearGradient>

        <linearGradient
          id={mutedGradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="340"
          x2="0"
          y2={VIEWBOX_HEIGHT}
        >
          <stop offset="0%" stopColor={mutedColor} stopOpacity="0" />
          <stop offset="40%" stopColor={mutedColor} stopOpacity="0.32" />
          <stop offset="100%" stopColor={mutedColor} stopOpacity="0.78" />
        </linearGradient>
      </defs>

      <rect
        width={VIEWBOX_WIDTH}
        height={VIEWBOX_HEIGHT}
        fill={BRAND_BACKGROUND_HEX}
      />

      <path
        d={WAVE_PATHS.back}
        fill={moodColor}
        fillOpacity={MOOD_WAVE_OPACITY.back}
      />
      <path
        d={WAVE_PATHS.mid}
        fill={moodColor}
        fillOpacity={MOOD_WAVE_OPACITY.mid}
      />

      <g style={{ mixBlendMode: "screen" }}>
        <path d={WAVE_PATHS.frontMid} fill={`url(#${blendGradientId})`} />
        <path d={WAVE_PATHS.front} fill={`url(#${mutedGradientId})`} />
      </g>
    </svg>
  );
}
