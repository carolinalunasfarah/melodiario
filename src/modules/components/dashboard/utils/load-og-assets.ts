export async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`;
  const css = await fetch(url).then((response) => response.text());
  const match = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
  );

  if (!match?.[1]) {
    throw new Error(`No se pudo cargar la fuente ${family} ${weight}.`);
  }

  const fontResponse = await fetch(match[1]);
  if (!fontResponse.ok) {
    throw new Error(`No se pudo cargar la fuente ${family} ${weight}.`);
  }

  return fontResponse.arrayBuffer();
}

export async function fetchAsDataUrl(
  url: string,
  fallbackMime = "image/png",
): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`No se pudo cargar el recurso: ${url}`);
  }

  const buffer = await response.arrayBuffer();
  const mime = response.headers.get("content-type") ?? fallbackMime;
  const base64 = Buffer.from(buffer).toString("base64");

  return `data:${mime};base64,${base64}`;
}
