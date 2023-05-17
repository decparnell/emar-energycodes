import styles from "../styles/home.module.css";
import Head from "next/head";
import Dashboard from "../components/dashboard";
import { useState, useEffect, useContext } from "react";
import AppContext from "../components/context/AppContext";
import TabNavbar from "../components/layout/tabHeader";
import ButtonNavbar from "../components/layout/buttonHeader";
import DataSpecSearch from "../components/dataspec/dataSpecSearch";
import { NewsBanner } from "../components/newsBanner";
import CodesSchedulesSearch from "../components/codesSchedules/codesSchedulesSearch";
import { checkIfVariablesAreAvailable } from "../components/helperFunctions/checkIfVariablesAreAvailable";
import { logError } from "../components/helperFunctions/logError";
import { checkIfItemsAvailableInArray } from "../components/helperFunctions/checkIfItemsAvailableInArray/";
import { logMessage } from "../components/helperFunctions/logMessage";
import FeedbackForm from "../components/feedbackForm/index";

function HomePage({
  dashboards,
  sections,
  items,
  latestVersionJson,
  newsData,
  mmsv,
  dataItems,
  codesSchedulesDataJson,
}) {
  const apiVarList = [
    { obj: newsData, name: "newsData" },
    { obj: items, name: "items" },
    { obj: latestVersionJson, name: "latestVersionJson" },
    { obj: mmsv, name: "mmsv" },
    { obj: dashboards, name: "dashboards" },
    { obj: sections, name: "sections" },
    { obj: dataItems, name: "dataItems" },
  ];
  const value = useContext(AppContext);
  let { chosenButton, chosenTab } = value.state;
  value.setNewsItems(newsData);

  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  /*  const [currentDashboard, setCurrentDashboard] = useState(() => {
    if (checkIfItemsAvailableInArray(internalErrorLog, "dashboards")) {
      return dashboards.filter((dashboard) => dashboard.dashboardOrder == 1)[0];
    }
  });

  const [currentSections, setCurrentSections] = useState(() => {
    if (
      checkIfItemsAvailableInArray(internalErrorLog, "dashboards") &&
      checkIfItemsAvailableInArray(internalErrorLog, "sections")
    ) {
      return sections.filter(
        (section) => section.dashboardId_FK == currentDashboard.dashboardId
      );
    }
  });
  useEffect(() => {
    if (checkIfItemsAvailableInArray(internalErrorLog, "dashboards")) {
      const newDashboard = dashboards.filter(
        (dashboard) => dashboard.dashboardId == chosenTab
      )[0];
      setCurrentDashboard(newDashboard);
    }
  }, [chosenTab]);

  useEffect(() => {
    if (
      checkIfItemsAvailableInArray(internalErrorLog, "dashboards") &&
      checkIfItemsAvailableInArray(internalErrorLog, "sections")
    ) {
      setCurrentSections(
        sections.filter(
          (section) => section.dashboardId_FK == currentDashboard.dashboardId
        )
      );
    }
  }, [currentDashboard]); */

  const [insertError, setInsertError] = useState("");

  return (
    <>
      {checkIfItemsAvailableInArray(internalErrorLog, "newsData") ? (
        <NewsBanner news={newsData} />
      ) : null}
      {/* <TabNavbar />
      <ButtonNavbar /> */}
      {insertError && (
        <div className={styles.errorBox}>{logMessage(insertError)}</div>
      )}
      <div className={styles.container}>
        <Head>
          <title>EMAR Dashboards</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        {/* {chosenButton == "1" &&
        checkIfItemsAvailableInArray(internalErrorLog, "dashboards") &&
        checkIfItemsAvailableInArray(internalErrorLog, "items") &&
        checkIfItemsAvailableInArray(internalErrorLog, "latestVersionJson") &&
        checkIfItemsAvailableInArray(internalErrorLog, "sections") ? (
          <Dashboard
            name={currentDashboard.dashboardName}
            columns={currentDashboard.dashboardColumns}
            sections={currentSections}
            items={items}
            versions={latestVersionJson}
          />
        ) : chosenButton == "2" &&
          chosenTab == "2" &&
          checkIfItemsAvailableInArray(internalErrorLog, "mmsv") &&
          checkIfItemsAvailableInArray(internalErrorLog, "dataItems") ? (
          <DataSpecSearch mmsv={mmsv} dataItems={dataItems} />
        ) : chosenButton == "2" && chosenTab == "1" ? (
          <CodesSchedulesSearch
            codesSchedulesDataJson={codesSchedulesDataJson}
          />
        ) : (
          <div className={styles.errorBox}>{logError("Dashboard")}</div>
        )} */}
        <FeedbackForm setInsertError={setInsertError} />
      </div>
    </>
  );
}

export default HomePage;

// This gets called on every request
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20000, stale-while-revalidate=59"
  );

  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-12.uksouth.logic.azure.com:443/workflows/4c67d7f8644444278df5488ba97723dc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6W4SqteUrXdeurJNKWJma27oNLUiaQeR6pdXIWqhAhw`
  );
  const dataJson = await dataReq.json();
  const dashboards = dataJson.dashboards;
  const sections = dataJson.sections;
  const items = dataJson.items;

  const getLatestVersions = await fetch(
    `https://prod-31.uksouth.logic.azure.com:443/workflows/74c7d3ac4b93473c81b4fc762aea9133/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uEnmZBZlGdrJ-pRJCcmTAMtoVJlLR2MIXiCYq3TXaf8`
  );
  const latestVersionJson = await getLatestVersions.json();

  const newsDataReq = await fetch(
    "https://prod-22.uksouth.logic.azure.com:443/workflows/e36d26ad83b04a86bc67b618e20c9dc5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Zymwu40i_cJZuIQhxAW9VZeDw22xzO97ie4sApLfizU"
  );
  const latestNewsJson = await newsDataReq.json();
  const newsData = latestNewsJson.latestNews;

  const codesSchedulesDataReq = await fetch(
    `https://prod-04.uksouth.logic.azure.com:443/workflows/51e9e129f1b645ee96aa180a68a2033f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Cg3T-VLyFtcRDJvXkEEYDLpftYytyNtWpBiD15qXosg`
  );
  const codesSchedulesDataJson = await codesSchedulesDataReq.json();
  const dataSpecData = await fetch(
    `https://prod2-25.uksouth.logic.azure.com:443/workflows/bc7a8128d44d4d1ea8cb95e2bac0b1b2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nKbYkRaRysRGNTguW8HeX5HhgtlfHDFwNCBwqRr8OdQ`
  );
  const dataSpecDataJson = await dataSpecData.json();
  const mmsv = dataSpecDataJson.mmsv;
  const dataItems = dataSpecDataJson.dataitems;
  // Pass data to the page via props
  return {
    props: {
      dashboards,
      sections,
      items,
      latestVersionJson,
      newsData,
      mmsv,
      dataItems,
      codesSchedulesDataJson,
    },
  };
}