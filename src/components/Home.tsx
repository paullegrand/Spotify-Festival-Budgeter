import { useState } from "react";
import LineupBuilder from "./LineupBuilder";
import DisplayLineup from "./DisplayLineup";
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
        <LineupBuilder
          buildFestival={buildFestival}
          selectedArtists={selectedArtists}
        />
      ) : (
        <>
          <DisplayLineup artists={selectedArtists} />
          <Footer>
            <Button intent="default" size="lg" onClick={backToBuilding}>
              Go Back
            </Button>
          </Footer>
        </>
      )}
    </>
  );
}
