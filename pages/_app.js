import "../styles/globals.css";
import Layout from "../components/layout/layout";
import AppContext from "../components/context/AppContext";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [allDataSpecVersions, setAllDataSpecVersions] = useState([
    { versionNumber: "2.2.1", status: "Superseeded" },
    { versionNumber: "2.2.2", status: "Superseeded" },
    { versionNumber: "2.3.0", status: "Superseeded" },
    { versionNumber: "3.0.0", status: "Live" },
    { versionNumber: "7.0.0", status: "Future" },
  ]); //

  const [latestDataSpecVersion, setLatestDataSpecVersion] = useState(
    allDataSpecVersions.filter((version) => version.status == "Live")[0]
      .versionNumber
  );

  const [chosenDataSpecVersion, setChosenDataSpecVersion] = useState(
    latestDataSpecVersion
  );
  return (
    <AppContext.Provider
      value={{
        state: {
          latestDataSpecVersion: latestDataSpecVersion,
          allDataSpecVersions: allDataSpecVersions,
        },
        setLatestDataSpecVersion: setLatestDataSpecVersion,
        setAllDataSpecVersions: setAllDataSpecVersions,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
