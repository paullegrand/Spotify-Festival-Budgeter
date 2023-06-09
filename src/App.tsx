import { getAccessToken } from "./auth/authCodeWithPkce";
import { getCookie } from "./auth/storage";
import Header from "./components/Header";
import Home from "./components/Home";
import Welcome from "./components/Welcome";

function App() {
  // If we have a code query param, we're probably performing our
  // OAuth dance, so let's go get our access token now.
  const params = new URLSearchParams(document.location.search);
  let code = params.get("code");
  if (code) {
    getAccessToken(code);
  }

  // Otherwise, let's check if we're logged in
  const isLoggedIn = getCookie("spotifyOAuthToken") !== "";

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="mx-auto">{isLoggedIn ? <Home /> : <Welcome />}</div>
    </div>
  );
}

export default App;
