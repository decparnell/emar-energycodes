import "../styles/globals.css";
import Layout from "../components/layout/layout";
import AppContext from "../components/context/AppContext";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    loading && (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    )
  );
}

export default function MyApp({ Component, pageProps }) {
  const [allDataSpecVersions, setAllDataSpecVersions] = useState([
    { versionNumber: "2.2.1", status: "Superseded" },
    { versionNumber: "2.2.2", status: "Superseded" },
    { versionNumber: "2.3.0", status: "Superseded" },
    { versionNumber: "3.0.0", status: "Live" },
    { versionNumber: "7.0.0", status: "Future" },
  ]); //

  const [latestDataSpecVersion, setLatestDataSpecVersion] = useState(
    allDataSpecVersions.filter((version) => version.status == "Live")[0]
      .versionNumber
  );

  const [newsItems, setNewsItems] = useState();
  const [chosenTab, setChosenTab] = useState(1);
  const [chosenButton, setChosenButton] = useState(1);
  return (
    <AppContext.Provider
      value={{
        state: {
          latestDataSpecVersion: latestDataSpecVersion,
          allDataSpecVersions: allDataSpecVersions,
          newsItems: newsItems,
          chosenTab: chosenTab,
          chosenButton: chosenButton,
        },
        setLatestDataSpecVersion: setLatestDataSpecVersion,
        setAllDataSpecVersions: setAllDataSpecVersions,
        setNewsItems: setNewsItems,
        setChosenTab: setChosenTab,
        setChosenButton: setChosenButton,
      }}
    >
      <Layout>
        <Loading />
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}
