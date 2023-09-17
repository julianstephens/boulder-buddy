import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify, Auth } from "aws-amplify";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useEffect } from "react";

Amplify.configure({
  aws_cognito_region: import.meta.env.VITE_AWS_REGION,
  aws_user_pools_id: import.meta.env.VITE_COGNITO_POOL_ID,
  aws_user_pools_web_client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  aws_mandatory_sign_in: "enable",
});

function App() {
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
    <Authenticator>
      {({ signOut, user }) => (
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
          <p>{user?.attributes?.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      )}
    </Authenticator>
  );
}

export default App;
