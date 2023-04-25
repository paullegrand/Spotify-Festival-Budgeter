import { redirectToAuthCodeFlow } from "../auth/authCodeWithPkce";
import Button from "../components/library/Button";
import WelcomeImage from "../assets/welcome.png";

export default function Welcome() {
  return (
    <div className="flex flex-row justify-center m-8 gap-8">
      <div className="flex-1">
        <h2 className="mt-16 text-4xl font-extrabold leading-7 text-emerald-400">
          Welcome
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Welcome to Festie Budgeter, the ultimate festival lineup builder!
          Easily connect to your Spotify account and fetch your top artists to
          curate the perfect festival lineup.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Whether you want to create a high-energy dance party or a laid-back
          indie fest, mix and match genres to create the perfect vibe.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Why wait? Connect your Spotify, and start building the festival lineup
          of your dreams!
        </p>
        <div className="text-center mt-12">
          <Button intent="success" onClick={redirectToAuthCodeFlow} size="lg">
            Sign in with Spotify
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <img src={WelcomeImage} />
      </div>
    </div>
  );
}
