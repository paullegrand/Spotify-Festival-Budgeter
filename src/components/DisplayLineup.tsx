import { useEffect, useState } from "react";

import Bg1 from "../assets/lineup-bgs/bg-1.png";
import Bg2 from "../assets/lineup-bgs/bg-2.png";
import Bg3 from "../assets/lineup-bgs/bg-3.png";
import Bg4 from "../assets/lineup-bgs/bg-4-darkened.png";
import Bg5 from "../assets/lineup-bgs/bg-5.png";

import LineupImageDay from "./LineupImageDay";

interface Props {
  artists: Artist[];
}

export default function DisplayLineup({ artists }: Props) {
  const [lineupByDay, setLineupByDay] = useState<Record<string, Artist[]>>({
    FRI: [],
    SAT: [],
    SUN: [],
  });

  // Split the linup into three days
  // The list should be sorted by popularity, so let's just go by threes
  useEffect(() => {
    const tempLineupByDay: Record<string, Artist[]> = {
      FRI: [],
      SAT: [],
      SUN: [],
    };

    for (let i = 0; i < artists.length; i++) {
      if (i % 3 === 0) {
        tempLineupByDay["FRI"].push(artists[i]);
      } else if (i % 3 === 1) {
        tempLineupByDay["SAT"].push(artists[i]);
      } else {
        tempLineupByDay["SUN"].push(artists[i]);
      }
    }

    setLineupByDay(tempLineupByDay);
  }, [artists]);

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="flex flex-row gap-8 mx-8">
        {/* Image selector */}
        <div className="w-full flex-2">
          {/* Image container */}
          <div className="relative" style={{ height: "720px" }}>
            {/* background Image */}
            <img src={Bg4} className="absolute top-0 left-0" />

            {/* Linup by Day */}
            <div className="absolute top-0 left-0 w-full h-full px-8">
              {Object.keys(lineupByDay).map((day: string) => (
                <LineupImageDay
                  artists={lineupByDay[day]}
                  day={day}
                  key={day}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">SOmething something</div>
      </div>
    </div>
  );
}
