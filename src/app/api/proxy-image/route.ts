const ALLOWED_IMAGE_HOSTS = new Set(["i.scdn.co"]);

function isAllowedImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" && ALLOWED_IMAGE_HOSTS.has(parsed.hostname)
    );
  } catch {
    return false;
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || !isAllowedImageUrl(url)) {
    return new Response("URL no permitida.", {
      status: 400,
      headers: corsHeaders,
    });
  }

  let upstream: Response;

  try {
    upstream = await fetch(url);
  } catch {
    return new Response("No se pudo obtener la imagen.", {
      status: 502,
      headers: corsHeaders,
    });
  }

  if (!upstream.ok) {
    return new Response("No se pudo obtener la imagen.", {
      status: 502,
      headers: corsHeaders,
    });
  }

  const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
  const buffer = await upstream.arrayBuffer();

  return new Response(buffer, {
    headers: {
      ...corsHeaders,
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
