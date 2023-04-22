import { useState } from "react";
import LineupBuilder from "./LineupBuilder";

export default function Home() {
  const [isBuildingLineup, setIsBuildingLineup] = useState(true);
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);

  const buildFestival = (artists: Artist[]): void => {
    // Sort our artists by popularity
    artists.sort((a, b) => {
      if (a.popularity > b.popularity) return -1;
      else if (a.popularity < b.popularity) return 1;
      return 0;
    });

    setIsBuildingLineup(false);
    setSelectedArtists(artists);
  };

  return (
    <>
      {isBuildingLineup ? (
        <LineupBuilder buildFestival={buildFestival} />
      ) : (
        <div className="flex flex-col">
          <div className="max-w-7xl mx-auto">
            {selectedArtists.map((artist) => (
              <p key={artist.id}>{artist.name}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
