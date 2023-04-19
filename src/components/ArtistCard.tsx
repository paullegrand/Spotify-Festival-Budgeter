import { formatCurrency } from "../filters";

interface Props {
  artist: Artist;
  hireArtist: () => void;
}

export default function ArtistCard({ artist, hireArtist }: Props) {
  const artistBookingPrice = Math.pow(artist.popularity, 3.4);

  return (
    <li className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow">
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full drop-shadow-xl"
          src={artist.images[0].url}
          alt={artist.name}
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {artist.name}
        </h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Genres</dt>
          <dd className="text-sm text-gray-500">{artist.genres.join(", ")}</dd>
        </dl>
        <div>
          <button
            type="button"
            className="rounded-md bg-emerald-600 px-3 py-2 mt-4 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            onClick={hireArtist}
          >
            Hire for {formatCurrency(artistBookingPrice, 0)}
          </button>
        </div>
      </div>
    </li>
  );
}
