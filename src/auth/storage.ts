export function getCookie(name: string): string {
  return (
    document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie.substring(0, name.length + 1) === `${name}=`)
      .map((cookie) =>
        decodeURIComponent(cookie.substring(name.length + 1))
      )[0] || ""
  );
}

export const clearLocalState = (): void => {
  localStorage.removeItem("verifier");
  // Clear our cookie by giving it a passed expiration date
  document.cookie =
    "spotifyOAuthToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
