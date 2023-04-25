interface Props {
  artists: Artist[];
  day: string;
}

// https://codereview.stackexchange.com/questions/33527
const getNextDayOfWeek = (date: Date, dayOfWeek: "FRI" | "SAT" | "SUN") => {
  let dayOfWeekInt: number;

  if (dayOfWeek === "FRI") dayOfWeekInt = 5;
  else if (dayOfWeek === "SAT") dayOfWeekInt = 6;
  else dayOfWeekInt = 0;

  var resultDate = new Date(date.getTime());

  resultDate.setDate(date.getDate() + ((7 + dayOfWeekInt - date.getDay()) % 7));

  return resultDate;
};

export default function LineupImageDay({ artists, day }: Props) {
  return (
    <>
      {artists[1] && (
        <div className="flex flex-row justify-between  mt-16 uppercase">
          <div className="text-yellow-300 text-2xl">{day}</div>
          <div className="text-center uppercase text-5xl">
            {artists[0].name}
          </div>
          <div className="text-yellow-300 text-3xl">28</div>
        </div>
      )}
      {artists[2] && (
        <div className="text-center text-2xl">
          {artists[1].name} • {artists[2].name}
        </div>
      )}
      {artists[5] && (
        <div className="text-center text-lg">
          {artists
            .slice(3, artists.length + 1)
            .map((artist) => artist.name)
            .join(" • ")}
        </div>
      )}
    </>
  );
}
