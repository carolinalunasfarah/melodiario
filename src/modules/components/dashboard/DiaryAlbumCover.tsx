import Image from "next/image";
import Link from "next/link";

type DiaryAlbumCoverProps = {
  albumCover: string | null;
  title: string;
  spotifyExternalUrl: string | null;
};

function DiaryAlbumCover({
  albumCover,
  title,
  spotifyExternalUrl,
}: DiaryAlbumCoverProps) {
  if (!albumCover) {
    return (
      <div className="flex aspect-square w-full max-w-[200px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-accent/50 bg-brand-background/20 p-4 text-center">
        <span className="mb-2 text-2xl" aria-hidden>
          🎵
        </span>
        <p className="text-xs text-brand-text/80">La carátula aparecerá aquí</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-2xl">
        <Image
          src={albumCover}
          alt={`Carátula de ${title}`}
          fill
          sizes="200px"
          priority
          className="object-cover"
        />
      </div>
      {spotifyExternalUrl ? (
        <Link
          href={spotifyExternalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand-accent underline-offset-4 hover:underline"
        >
          Escuchar en Spotify
        </Link>
      ) : null}
    </>
  );
}

export default DiaryAlbumCover;
