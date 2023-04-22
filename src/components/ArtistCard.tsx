import { formatCurrency } from "../filters";
import Button from "../components/library/Button";

interface Props {
  artist: Artist;
  bookArtist: (artist: Artist) => void;
  dropArtist: (artist: Artist) => void;
  isHired: boolean;
  bookingPrice: number;
}

export default function ArtistCard({
  artist,
  bookArtist,
  dropArtist,
  isHired,
  bookingPrice,
}: Props) {
  return (
    <li className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow transform transition duration-500 hover:scale-110">
      <div className="flex flex-1 flex-row flex-wrap p-4 md:p-8 pb-2">
        <div className="w-full md:w-1/2">
          <img
            className="mx-auto h-16 w-16 md:h-32 md:w-32 flex-shrink-0 rounded-full drop-shadow-xl"
            src={artist.images[0].url}
            alt={artist.name}
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <h3 className="text-md font-medium text-gray-900">{artist.name}</h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">Genres</dt>
            <dd className="text-sm text-gray-500">
              {artist.genres.join(", ")}
            </dd>
          </dl>
        </div>
      </div>
      <div className="flex flex-col pb-4 mx-8">
        {isHired ? (
          <Button intent="default" onClick={() => dropArtist(artist)}>
            Drop
          </Button>
        ) : (
          <Button intent="success" onClick={() => bookArtist(artist)}>
            Book
          </Button>
        )}
        <p className="text-gray-800 pt-2">
          {isHired ? "+" : "-"}
          {formatCurrency(bookingPrice, 0)}{" "}
        </p>
      </div>
    </li>
  );
}
