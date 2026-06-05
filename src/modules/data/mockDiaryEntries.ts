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

/** Mock entries keyed by local date (YYYY-MM-DD). */
export const MOCK_ENTRIES_BY_DATE: Record<string, string> = {
  "2026-06-01": MOCK_COVERS[0],
  "2026-06-02": MOCK_COVERS[1],
  "2026-06-03": MOCK_COVERS[2],
  "2026-06-04": MOCK_COVERS[3],
  "2026-06-05": MOCK_COVERS[4],
  "2026-06-06": MOCK_COVERS[5],
  "2026-06-07": MOCK_COVERS[6],
  "2026-06-08": MOCK_COVERS[7],
  "2026-06-09": MOCK_COVERS[8],
  "2026-06-10": MOCK_COVERS[9],
  "2026-06-12": MOCK_COVERS[2],
  "2026-06-14": MOCK_COVERS[4],
  "2026-06-16": MOCK_COVERS[6],
  "2026-06-18": MOCK_COVERS[8],
  "2026-06-20": MOCK_COVERS[0],
  "2026-06-22": MOCK_COVERS[3],
  "2026-06-24": MOCK_COVERS[5],
  "2026-06-26": MOCK_COVERS[7],
  "2026-06-28": MOCK_COVERS[9],
  "2026-06-30": MOCK_COVERS[1],
  "2026-07-01": MOCK_COVERS[4],
  "2026-07-02": MOCK_COVERS[6],
  "2026-07-03": MOCK_COVERS[8],
};

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getMockCoverForDate(date: Date): string | undefined {
  return MOCK_ENTRIES_BY_DATE[toDateKey(date)];
}
