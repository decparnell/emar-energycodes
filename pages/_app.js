import "../styles/globals.css";
import Layout from "../components/layout/layout";
import AppContext from "../components/context/AppContext";
import Router from "next/router";
import { useState, useEffect, useContext } from "react";
import Script from "next/script";
function Loading() {
  //appcontext variables
  const value = useContext(AppContext);
  let { loading } = value.state;
  //appcontext methods
  const {setLoading, setAllDataSpecVersions, setLatestDataSpecVersion} = useContext(AppContext);

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

  //TO-DO: performance improvement, fetchRecVersions should be triggered only certain type of page are being invoked
  useEffect(() => {
    const fetchRecVersions = async () => {
      try {
        const response = await fetch('https://prod-07.uksouth.logic.azure.com:443/workflows/8920bdcc74c94f6fa6a7b157b83f933a/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=Bz5tW3QlJj53K4zrqYFw3h6cPg8-A62iRqIN_Q9ktWY');
        const data = await response.json();
        const recVersions = data.RecVersions;
        setAllDataSpecVersions(recVersions);
        setLatestDataSpecVersion(recVersions.filter((version) => version.status === "Live")[0]?.name || "");
        //setLatestDataSpecVersion(allDataSpecVersions.filter((version) => version.status === "Live")[0].name);
      } catch (error) {
        console.error('Error fetching recVersions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecVersions();
  }, [setAllDataSpecVersions, setLatestDataSpecVersion, setLoading]);


  return (
    loading && (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    )
  );
}

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [allDataSpecVersions, setAllDataSpecVersions] = useState([]);
  const [latestDataSpecVersion, setLatestDataSpecVersion] = useState("");

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
        <AppContext.Provider
          value={{
            state: {
              loading: loading,
              latestDataSpecVersion: latestDataSpecVersion,
              allDataSpecVersions: allDataSpecVersions,
              newsItems: newsItems,
              chosenTab: chosenTab,
              chosenButton: chosenButton,
              errorLog: errorLog,
            },
            setLoading: setLoading,
            setLatestDataSpecVersion: setLatestDataSpecVersion,
            setAllDataSpecVersions: setAllDataSpecVersions,
            setNewsItems: setNewsItems,
            setChosenTab: setChosenTab,
            setChosenButton: setChosenButton,
            setErrorLog: setErrorLog,
          }}
        >
          <Loading />
          <Layout chosenTab={chosenTab}>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
    </>
  );
}

export default MyApp;
