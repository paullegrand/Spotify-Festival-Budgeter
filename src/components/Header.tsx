import { clearLocalState, getCookie } from "../auth/storage";

const logOut = (): void => {
  clearLocalState();
  window.location.replace("/");
};

export default function Header() {
  const isLoggedIn = getCookie("spotifyOAuthToken") !== "";

  return (
    <header className="bg-gray-800">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex flex-row justify-between gap-8 w-full">
          <p className="text-gray-100 font-bold">Spotify Festival Budgeter</p>
          {isLoggedIn && (
            <button
              type="button"
              className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              onClick={logOut}
            >
              Log Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
