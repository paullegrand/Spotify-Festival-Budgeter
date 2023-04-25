import { useEffect, useState } from "react";

interface Props {
  artists: Artist[];
}

export default function DisplayLineup({ artists }: Props) {
  const [lineupByDay, setLineupByDay] = useState<Artist[][]>([[]]);

  // Split the linup into three days
  // The list should be sorted by popularity, so let's just go by threes
  useEffect(() => {
    const firstDay: Artist[] = [];
    const secondDay: Artist[] = [];
    const thirdDay: Artist[] = [];

    for (let i = 0; i < artists.length; i++) {
      if (i % 3 === 0) {
        firstDay.push(artists[i]);
      } else if (i % 3 === 1) {
        secondDay.push(artists[i]);
      } else {
        thirdDay.push(artists[i]);
      }
    }

    setLineupByDay([firstDay, secondDay, thirdDay]);
  }, [artists]);

  return (
    <div className="flex flex-col">
      <div className="max-w-7xl mx-auto py-4">
        {lineupByDay[0].length ? (
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
    </div>
  );
}
