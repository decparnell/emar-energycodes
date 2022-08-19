import "../styles/globals.css";
import Layout from "../components/layout/layout";
import AppContext from "../components/context/AppContext";
import Router from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../public/recco_logo.PNG";
function Loading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== Router.asPath && setLoading(true);
    const handleComplete = (url) => url == Router.asPath && setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [Router]);

  return (
    loading && (
      <div className="spinner-wrapper">
        <Image alt="Recco logo" src={logo} className="spinner" />
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
    <>
      <Loading />
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
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </>
  );
}
