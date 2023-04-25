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
import Footer from "./Footer";

interface Props {
  buildFestival: (hiredArtists: Artist[]) => void;
  selectedArtists: Artist[];
}

export default function LineupBuilder({
  buildFestival,
  selectedArtists,
}: Props) {
  const totalBudget = 5000000;
  const [remainingBudget, setRemainingBudget] = useState<number>(totalBudget);
  const [topArtists, setTopArtists] = useState<TopArtists>();
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<string>("medium_term");
  const [hiredArtists, setHiredArtists] = useState<Artist[]>(selectedArtists);

  // Immediately load our top artists with our currently selected timeframe
  useEffect(() => {
    fetchTopArtists(selectedTimeRange).then((topArtists) =>
      setTopArtists(topArtists)
    );
  }, [selectedTimeRange]);

  // Calculate how much each artist might cost, based on their popularity
  // @TODO: Would it be possible to look up booking prices for artists, and get a line of best fit with an actual equation?
  const priceForArtist = (artist: Artist): number =>
    Math.pow(artist.popularity, 3);

  // When we hire an artist, automatically update the remaining budget, and the percent of budget remaining
  useEffect(() => {
    // Start with our total budget
    // And for every artist, decrease our budget by their booking price
    let remainingBudget = totalBudget;
    hiredArtists.map((artist) => {
      remainingBudget -= priceForArtist(artist);
    });
    // After every artist, set our remaining budget
    setRemainingBudget(remainingBudget);
  }, [hiredArtists]);

  setTimeout(() => {
    if (topArtists) setHiredArtists(topArtists.items.slice(0, 20));
  }, 500);

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
  const handleRequestBookArtist = (artist: Artist) => {
    const price = priceForArtist(artist);

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
      throw new Error(`${artist.name} is already hired!`);
    }

    // All good? Book em!
    setHiredArtists([...hiredArtists, artist]);
  };

  // When we click the drop button, we need to remove them from our hired artists array
  // That will automatically trigger updating our remaining budget
  const handleRequestDropArtist = (artist: Artist) => {
    // Make sure we already have this artist hired
    if (!isArtistHired(artist)) {
      throw new Error("Artist is not hired yet, we can't fire them!");
    }

    // All good? go ahead and drop em.
    setHiredArtists(hiredArtists.filter((a) => a.id !== artist.id));
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-2 md:px-8">
      <div className="w-1/2 pt-4">
        <Select
          options={timerangeOptions}
          label="View my top artists from the past..."
          name="time_range"
          selectedValue={selectedTimeRange}
          handleChange={handleTimeRangeChange}
        />
      </div>

      {topArtists && (
        <ul
          role="list"
          className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 py-2 md:py-8 mb-24"
        >
          {topArtists.items.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              bookArtist={handleRequestBookArtist}
              dropArtist={handleRequestDropArtist}
              isHired={isArtistHired(artist)}
              bookingPrice={priceForArtist(artist)}
            />
          ))}
        </ul>
      )}

      <ToastContainer />
      <Footer>
        <div className="w-full ml-8">
          <div className="flex justify-between my-4">
            <span className="font-medium text-gray-100">Remaining Budget</span>
            <span className="text-xs md:text-base font-medium text-gray-100 text-right">
              <AnimatedCounter value={remainingBudget} isCurrency /> /{" "}
              {formatCurrency(totalBudget, 0)} (
              {Math.round((remainingBudget / totalBudget) * 100)}%)
            </span>
          </div>
          <div className="w-full rounded-full h-2.5 bg-gray-700">
            <div
              className="bg-emerald-300 h-2.5 rounded-full"
              style={{ width: (remainingBudget / totalBudget) * 100 + "%" }}
            ></div>
          </div>
        </div>

        <div className="mr-8">
          <Button
            intent="success"
            onClick={() => buildFestival(hiredArtists)}
            size="lg"
          >
            Build festival
          </Button>
        </div>
      </Footer>
    </div>
  );
}
