import React, { useEffect, useState } from "react";
import { fetchTopArtists } from "../api/spotify";
import ArtistCard from "./ArtistCard";
import Select from "./forms/Select";

export default function Home() {
  const [profile, setProfile] = useState<UserProfile>();
  const [topArtists, setTopArtists] = useState<TopArtists>();
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<string>("medium_term");

  // Immediately load our top artists with our currently selected timeframe
  useEffect(() => {
    fetchTopArtists(selectedTimeRange).then((topArtists) =>
      setTopArtists(topArtists)
    );
  }, [selectedTimeRange]);

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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeRange(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="mx-8 mt-4 flex flex-row gap-8">
        <Select
          options={timerangeOptions}
          label="View my top artists from the past..."
          name="time_range"
          selectedValue={selectedTimeRange}
          handleChange={handleChange}
        />

        {profile && <code>{JSON.stringify(profile)}</code>}
      </div>

      {topArtists && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 m-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {topArtists.items.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} hireArtist={() => {}} />
          ))}
        </ul>
      )}
    </div>
  );
}
