import { Providers } from "@/components/Providers";
import "@aws-amplify/ui-react/styles.css";
import { QueryClient } from "@tanstack/react-query";
import { Amplify, Auth, Hub } from "aws-amplify";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { MesoForm } from "./components/MesoForm";
import viteLogo from "/vite.svg";

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_COGNITO_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    mandatorySignIn: false,
    oauth: {
      domain: import.meta.env.VITE_COGNITO_DOMAIN,
      scope: ["openid", "email", "aws.cognito.signin.user.admin"],
      redirectSignIn: "http://localhost:5173",
      redirectSignOut: "http://localhost:5173",
      clientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      responseType: "code",
    },
  },
});

const listener = (data: { payload: { event: string } }) => {
  switch (data?.payload?.event) {
    case "signIn":
      console.log("user signed in");
      break;
    case "signOut":
      console.log("user signed out");
      break;
    default:
      break;
  }
};

Hub.listen("auth", listener);

const client = new QueryClient();

function App() {
  const isAuthed = () => {
    const v = window.localStorage.getItem("isAuthed");
    return v === "true";
  };

  const authClick = () => {
    if (isAuthed()) {
      window.localStorage.removeItem("isAuthed");
      Auth.signOut().catch((err) => console.error(err));
    } else {
      window.localStorage.setItem("isAuthed", "true");
      Auth.federatedSignIn().catch((err) => console.error(err));
    }
  };

  return (
    <Providers queryClient={client}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
        </div>
        <button onClick={authClick}>
          {isAuthed() ? "Sign Out" : "Sign In"}
        </button>
      </div>
      <div style={{ marginTop: "8rem" }}>
        <MesoForm />
      </div>
    </Providers>
  );
}

export default App;
