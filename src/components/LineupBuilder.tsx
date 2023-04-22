import { useEffect, useState } from "react";

// Functions we need
import { fetchTopArtists } from "../api/spotify";
import { formatCurrency } from "../filters";

// Custom components
import ArtistCard from "./ArtistCard";
import Select from "./forms/Select";
import AnimatedCounter from "./library/AnimatedCounter";
import Button from "./library/Button";

// Toast alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  buildFestival: (hiredArtists: Artist[]) => void;
}

export default function LineupBuilder({ buildFestival }: Props) {
  const totalBudget = 5000000;
  const [remainingBudget, setRemainingBudget] = useState<number>(totalBudget);
  const [remainingBudgetPercent, setRemainingBudgetPercent] =
    useState<number>(100);
  const [topArtists, setTopArtists] = useState<TopArtists>();
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<string>("medium_term");
  const [hiredArtists, setHiredArtists] = useState<Artist[]>([]);

  // Immediately load our top artists with our currently selected timeframe
  useEffect(() => {
    fetchTopArtists(selectedTimeRange).then((topArtists) =>
      setTopArtists(topArtists)
    );
  }, [selectedTimeRange]);

  // When we hire an artist, automatically update the percent of our budget remaining
  useEffect(() => {
    setRemainingBudgetPercent(
      Math.round((remainingBudget / totalBudget) * 100)
    );
  }, [remainingBudget]);

  // Let's save our hired artists state so it persists between refresh
  useEffect(() => {
    localStorage.setItem("hiredArtists", hiredArtists.toString());
  }, [hiredArtists]);

  // For some reason, the artist object changes sometime from the spotify API.
  // So, we want to check via ID rather than using `.includes()`
  const isArtistHired = (artist: Artist): boolean => {
    return hiredArtists.filter((a) => a.id === artist.id).length > 0;
  };

  // From the Spotify API, these are the valid options
  // See: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const timerangeOptions = [
    {
      label: "4 weeks",
      value: "short_term",
    },
    {
      label: "6 Months",
      value: "medium_term",
    },
    {
      label: "Several Years",
      value: "long_term",
    },
  ];

  // Handle when our user selects a different time range for their top artists
  const handleTimeRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimeRange(event.target.value);
  };

  // When we click the "Hire" button, this function handles that action
  const handleRequestBookArtist = (artist: Artist, price: number) => {
    // Make sure we have enough money left in our budget to hire this artist
    if (price > remainingBudget) {
      toast("💸 Money flies! You're over budget 😔", {
        position: "top-right",
        autoClose: 4000,
        theme: "dark",
      });
      return;
    }

    // Just for extra safesies, make sure we haven't already hired them
    // This shouldn't be an issue though
    if (isArtistHired(artist)) {
      console.error("Artist is already hired!");
      return;
    }

    // All good? Hire them! Update our budget and add them to our hired artists array
    setRemainingBudget(remainingBudget - price);
    setHiredArtists([...hiredArtists, artist]);
  };

  const handleRequestDropArtist = (artist: Artist, price: number) => {
    // Make sure we already have this artist hired
    if (!isArtistHired(artist)) {
      throw new Error("Artist is not hired yet, we can't fire them!");
    }

    // All good? go ahead and fire em. Remove them from our hired artists and give the user back their money
    setRemainingBudget(remainingBudget + price);
    setHiredArtists(hiredArtists.filter((a) => a.id !== artist.id));
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 bg-gray-500 z-10 py-2 md:py-4 px-8 drop-shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-row flex-wrap md:flex-nowrap gap-4 md:gap-8 ">
          <div className="w-full md:w-1/3">
            <Select
              options={timerangeOptions}
              label="View my top artists from the past..."
              name="time_range"
              selectedValue={selectedTimeRange}
              handleChange={handleTimeRangeChange}
            />
          </div>

          <div className="w-full md:w-2/3">
            <div className="flex justify-between mb-1 text-xs">
              <span className="font-medium text-gray-100">
                Remaining Budget
              </span>
              <span className="text-xs md:text-base font-medium text-gray-100 text-right">
                <AnimatedCounter value={remainingBudget} isCurrency /> /{" "}
                {formatCurrency(totalBudget, 0)} ({remainingBudgetPercent}%)
              </span>
            </div>
            <div className="w-full rounded-full h-2.5 bg-gray-700">
              <div
                className="bg-emerald-300 h-2.5 rounded-full"
                style={{ width: remainingBudgetPercent + "%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {topArtists && (
        <ul
          role="list"
          className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto p-2 md:p-8"
        >
          {topArtists.items.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              bookArtist={handleRequestBookArtist}
              dropArtist={handleRequestDropArtist}
              isHired={isArtistHired(artist)}
            />
          ))}
        </ul>
      )}
      <ToastContainer />
      <div className="bg-gray-500 sticky bottom-0">
        <div className="flex flex-row gap-8 justify-end z-10 drop-shadow-xl max-w-7xl mx-auto">
          <Button intent="success" onClick={() => buildFestival(hiredArtists)}>
            Build festival
          </Button>
        </div>
      </div>
    </div>
  );
}