import { useState } from "react";
import LineupBuilder from "./LineupBuilder";
import Footer from "./Footer";
import Button from "./library/Button";

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

  const backToBuilding = () => {
    setIsBuildingLineup(true);
  };

  return (
    <>
      {isBuildingLineup ? (
        <LineupBuilder buildFestival={buildFestival} selectedArtists={selectedArtists} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="max-w-7xl mx-auto">
            {selectedArtists.length ? (
              selectedArtists.map((artist) => (
                <p key={artist.id}>{artist.name}</p>
              ))
            ) : (
              <h2>No artists selected!</h2>
            )}
          </div>
          <Footer>
            <Button intent="warning" onClick={backToBuilding}>
              Go Back
            </Button>
          </Footer>
        </div>
      )}
    </>
  );
}
