import { useEffect, useState } from "react";
import LineupBuilder from "./LineupBuilder";
import Footer from "./Footer";
import Button from "./library/Button";

export default function Home() {
  const [isBuildingLineup, setIsBuildingLineup] = useState(true);
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);
  const [lineupByDay, setLineupByDay] = useState<Artist[][]>([[]]);

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

  useEffect(() => {
    const firstDay: Artist[] = [];
    const secondDay: Artist[] = [];
    const thirdDay: Artist[] = [];

    for (let i = 0; i < selectedArtists.length; i++) {
      if (i % 3 === 0) {
        firstDay.push(selectedArtists[i]);
      } else if (i % 3 === 1) {
        secondDay.push(selectedArtists[i]);
      } else {
        thirdDay.push(selectedArtists[i]);
      }
    }

    setLineupByDay([firstDay, secondDay, thirdDay]);
  }, [selectedArtists]);

  return (
    <>
      {isBuildingLineup ? (
        <LineupBuilder
          buildFestival={buildFestival}
          selectedArtists={selectedArtists}
        />
      ) : (
        <div className="flex flex-col">
          <div className="max-w-7xl mx-auto py-4">
            {selectedArtists.length ? (
              <>
                <div className="mb-4">
                  <h2 className="font-bold text-xl">Friday</h2>
                  {lineupByDay[0].map((artist) => (
                    <p>{artist.name}</p>
                  ))}
                </div>

                <div className="mb-4">
                  <h2 className="font-bold text-xl">Saturday</h2>
                  {lineupByDay[1].map((artist) => (
                    <p>{artist.name}</p>
                  ))}
                </div>

                <div className="mb-4">
                  <h2 className="font-bold text-xl">Sunday</h2>
                  {lineupByDay[2].map((artist) => (
                    <p>{artist.name}</p>
                  ))}
                </div>
              </>
            ) : (
              <h2>No artists selected!</h2>
            )}
          </div>
          <Footer>
            <Button intent="default" size="lg" onClick={backToBuilding}>
              Go Back
            </Button>
          </Footer>
        </div>
      )}
    </>
  );
}
