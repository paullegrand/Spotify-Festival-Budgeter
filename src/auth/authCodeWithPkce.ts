const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export async function redirectToAuthCodeFlow() {
  const verifier =
    localStorage.getItem("verifier") || generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  const params = new URLSearchParams({
    response_type: "code",
    client_id,
    redirect_uri: import.meta.env.DEV
      ? "http://localhost:5173"
      : "https://d6dkwpxitazmw.cloudfront.net",
    scope: "user-read-private user-top-read",
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(code: string): Promise<void> {
  const verifier = localStorage.getItem("verifier");
  if (!verifier) {
    throw new Error("Verifier not found in local storage!");
  }

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id,
      grant_type: "authorization_code",
      code,
      redirect_uri: import.meta.env.DEV
        ? "http://localhost:5173"
        : "https://d6dkwpxitazmw.cloudfront.net",
      code_verifier: verifier,
    }),
  });

  const { access_token, expires_in }: OAuthResponse = await result.json();
  const now = new Date();
  const expireTime = new Date(now.getTime() + expires_in * 1000);
  // For some reason when running this locally, the request gets fired off twice.
  // This doesn't happen when we build it, so just check here before overwriting our cookie.
  if (access_token) {
    document.cookie = `spotifyOAuthToken=${access_token}; expires=${expireTime.toUTCString()}; path=/`;
    document.location = "/";
  }
  return;
}

function generateCodeVerifier(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  localStorage.setItem("verifier", text);
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
