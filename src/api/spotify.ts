import { getCookie } from "../auth/storage";

export async function fetchProfile(): Promise<UserProfile> {
  const access_token = getCookie("spotifyOAuthToken");
  if (!access_token) {
    throw new Error("No access token found");
  }

  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return await result.json();
}

export async function fetchTopArtists(time_range: string): Promise<TopArtists> {
  const access_token = getCookie("spotifyOAuthToken");
  if (!access_token) {
    throw new Error("No access token found");
  }

  const result = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${encodeURIComponent(
      time_range
    )}&limit=50`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  return await result.json();
}
