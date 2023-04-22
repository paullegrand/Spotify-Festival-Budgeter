import { clearLocalState, getCookie } from "../auth/storage";
import Button from "../components/library/Button";

const logOut = (): void => {
  clearLocalState();
  window.location.replace("/");
};

export default function Header() {
  const isLoggedIn = getCookie("spotifyOAuthToken") !== "";

  return (
    <header className="bg-gray-800">
      <nav
        className="mx-auto max-w-7xl flex items-center justify-between py-6"
        aria-label="Global"
      >
        <div className="flex flex-row justify-between gap-8 w-full mx-8">
          <p className="text-gray-100 font-bold py-2">
            Spotify Festival Budgeter
          </p>
          {isLoggedIn && (
            <Button intent="success" onClick={logOut}>
              Log Out
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
