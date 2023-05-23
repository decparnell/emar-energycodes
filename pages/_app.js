import "../styles/globals.css";
import Layout from "../components/layout/layout";
import AppContext from "../components/context/AppContext";
import Router from "next/router";
import { useState, useEffect } from "react";
import Script from "next/script";
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
    { versionNumber: "3.0.0", status: "Superseded" },
    { versionNumber: "3.2.0", status: "Superseded" },
    { versionNumber: "3.3.0", status: "Live" },
  ]); //

  const [latestDataSpecVersion, setLatestDataSpecVersion] = useState(
    allDataSpecVersions.filter((version) => version.status == "Live")[0]
      .versionNumber
  );

  const [newsItems, setNewsItems] = useState();
  const [chosenTab, setChosenTab] = useState("Schedules");
  const [chosenButton, setChosenButton] = useState(1);

  const [errorLog, setErrorLog] = useState([]);
  return (
    <>
      <Script
        id="Gscript1"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-V6P5LWX5R8`}
      />

      <Script strategy="lazyOnload" id="Gscript2">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-V6P5LWX5R8', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <Loading />
      <AppContext.Provider
        value={{
          state: {
            latestDataSpecVersion: latestDataSpecVersion,
            allDataSpecVersions: allDataSpecVersions,
            newsItems: newsItems,
            chosenTab: chosenTab,
            chosenButton: chosenButton,
            errorLog: errorLog,
          },
          setLatestDataSpecVersion: setLatestDataSpecVersion,
          setAllDataSpecVersions: setAllDataSpecVersions,
          setNewsItems: setNewsItems,
          setChosenTab: setChosenTab,
          setChosenButton: setChosenButton,
          setErrorLog: setErrorLog,
        }}
      >
        <Layout chosenTab={chosenTab}>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </>
  );
}
