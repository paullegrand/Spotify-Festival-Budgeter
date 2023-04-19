import { redirectToAuthCodeFlow } from "../auth/authCodeWithPkce";

export default function Login() {
  return (
    <div className="flex flex-row justify-center m-8">
      <button
        type="button"
        className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        onClick={redirectToAuthCodeFlow}
      >
        Sign in with Spotify
      </button>
    </div>
  );
}
