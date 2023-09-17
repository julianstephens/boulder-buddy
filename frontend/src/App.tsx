import "@aws-amplify/ui-react/styles.css";
import { Amplify, Auth, Hub } from "aws-amplify";
import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
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

const listener = (data: any) => {
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

function App() {
  const [currentUser] = useState();
  const getData = async () => {
    const data = await fetch(`/api/mesos`, {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    });
    const res = await data.json();

    return res;
  };

  const isAuthed = () => {
    const v = window.localStorage.getItem("isAuthed");
    return v === "true";
  };

  const authClick = async () => {
    if (isAuthed()) {
      window.localStorage.removeItem("isAuthed");
      await Auth.signOut();
    } else {
      window.localStorage.setItem("isAuthed", "true");
      await Auth.federatedSignIn();
    }
  };

  useEffect(() => {
    getData().then(
      (res) => {
        console.log("RES", res);
      },
      (err) => {
        console.error("ERR", err);
      }
    );
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>{(currentUser as any)?.email}</p>
      <button onClick={authClick}>{isAuthed() ? "Sign Out" : "Sign In"}</button>
    </>
  );
}

export default App;
