import { redirectToAuthCodeFlow } from "../auth/authCodeWithPkce";
import Button from "../components/library/Button";

export default function Login() {
  return (
    <div className="flex flex-row justify-center m-8">
      <Button intent="success" onClick={redirectToAuthCodeFlow}>
        Sign in with Spotify
      </Button>
    </div>
  );
}
