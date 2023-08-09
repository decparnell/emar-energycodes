import "../styles/globals.css";
import Layout from "../components/layout/layout";
import AppContext from "../components/context/AppContext";
import { useState, useEffect } from "react";
import Script from "next/script";
import Loading from "../components/loading";
import { fetchVersionMapping } from "../components/helperFunctions/versioning";

MyApp.getInitialProps = async () => {
  const recVersionResponse = await fetch(
    "https://prod-07.uksouth.logic.azure.com:443/workflows/8920bdcc74c94f6fa6a7b157b83f933a/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=Bz5tW3QlJj53K4zrqYFw3h6cPg8-A62iRqIN_Q9ktWY"
  );
  const recVersionData = await recVersionResponse.json();
  const allVersions = recVersionData.RecVersions;
  const liveVersion =
    allVersions.filter((version) => version.status === "Live")[0]?.name || "";

  const versionMappingResponse = await fetch(
    `https://prod-15.uksouth.logic.azure.com/workflows/82a99e91c7b8468bb1eda20842ec26c1/triggers/manual/paths/invoke/recVersion/${liveVersion}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UdfTkCt6-fScMlY692_H3A_3RwfuGkHN0GmEzIrwots`

  );
  const versionMappingData = await versionMappingResponse.json();
  const versionMapping = versionMappingData.versionMapping;
  return {
    allVersions: allVersions,
    liveVersion: liveVersion,
    versionMapping: versionMapping,
  };
};

function MyApp({
  Component,
  pageProps,
  allVersions,
  liveVersion,
  versionMapping,
}) {
  const [loading, setLoading] = useState(false);
  const [allDataSpecVersions, setAllDataSpecVersions] = useState(allVersions);
  const [latestDataSpecVersion, setLatestDataSpecVersion] = useState(liveVersion);
  const [chosenTab, setChosenTab] = useState("Schedules");
  const [newsItems, setNewsItems] = useState();
  const [currentVersionMapping, setCurrentVersionMapping] =
    useState(versionMapping);
  //search pages variables
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState({ name: "Codes Schedules" });
  const [errorLog, setErrorLog] = useState([]);

  useEffect(() => {
    fetchVersionMapping(latestDataSpecVersion).then((data) => {
      setCurrentVersionMapping(data);
    })
      .catch((error) => {
        console.error("Error Fetching Version Mapping:", error);
      });
  }, [latestDataSpecVersion]);

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
            errorLog: errorLog,
            chosenTab: chosenTab,
            currentVersionMapping: currentVersionMapping,
            searchValue: searchValue,
            searchType: searchType,
          },
          setLoading: setLoading,
          setLatestDataSpecVersion: setLatestDataSpecVersion,
          setAllDataSpecVersions: setAllDataSpecVersions,
          setNewsItems: setNewsItems,
          setErrorLog: setErrorLog,
          setChosenTab: setChosenTab,
          setCurrentVersionMapping: setCurrentVersionMapping,
          setSearchValue: setSearchValue,
          setSearchType: setSearchType,
        }}
      >
        <Loading />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </>
  );
}

export default MyApp;
