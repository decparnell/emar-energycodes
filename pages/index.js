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


function HomePage({
  dashboards,
  sections,
  items,
  latestVersionJson,
  newsData,
  mmsv,
  dataItems,
  codesSchedulesDataJson
}) {
  const apiVarList = [
    { obj: newsData, name: "newsData" },
    { obj: items, name: "items" },
    { obj: latestVersionJson, name: "latestVersionJson" },
    { obj: mmsv, name: "mmsv" },
    { obj: dashboards, name: "dashboards" },
    { obj: sections, name: "sections" },
    { obj: dataItems, name: "dataItems" }
  ];
  const value = useContext(AppContext);
  let { chosenButton, chosenTab } = value.state;
  value.setNewsItems(newsData);

  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  const [currentDashboard, setCurrentDashboard] = useState(() => {
    if (internalErrorLog.indexOf("dashboards") === -1) {
      return dashboards.filter((dashboard) => dashboard.dashboardOrder == 1)[0];
    }
  });

  const [currentSections, setCurrentSections] = useState(() => {
    if (
      internalErrorLog.indexOf("dashboards") === -1 &&
      internalErrorLog.indexOf("sections")
    ) {
      return sections.filter(
        (section) => section.dashboardId_FK == currentDashboard.dashboardId
      );
    }
  });
  useEffect(() => {
    if (internalErrorLog.indexOf("dashboards") === -1) {
      const newDashboard = dashboards.filter(
        (dashboard) => dashboard.dashboardId == chosenTab
      )[0];
      setCurrentDashboard(newDashboard);
    }
  }, [chosenTab]);

  useEffect(() => {
    if (
      internalErrorLog.indexOf("dashboards") === -1 &&
      internalErrorLog.indexOf("sections")
    ) {
      setCurrentSections(
        sections.filter(
          (section) => section.dashboardId_FK == currentDashboard.dashboardId
        )
      );
    }
  }, [currentDashboard]);

  return (
    <>
      {internalErrorLog.indexOf("newsData") === -1 ? (
        <NewsBanner news={newsData} />
      ) : (
        <div className={styles.errorBox}>
          {logError("News Data", "is not available")}
        </div>
      )}
      <TabNavbar />
      <ButtonNavbar />
      <div className={styles.container}>
        <Head>
          <title>EMAR Dashboards</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        {chosenButton == "1" &&
        internalErrorLog.indexOf("dashboards") === -1 &&
        internalErrorLog.indexOf("items") === -1 &&
        internalErrorLog.indexOf("latestVersionJson") === -1 &&
        internalErrorLog.indexOf("sections") === -1 ? (
          <Dashboard
            name={currentDashboard.dashboardName}
            columns={currentDashboard.dashboardColumns}
            sections={currentSections}
            items={items}
            versions={latestVersionJson}
          />
        ) : chosenButton == "2" &&
          chosenTab == "2" &&
          internalErrorLog.indexOf("mmsv") === -1 &&
          internalErrorLog.indexOf("dataItems") === -1 ? (
          <DataSpecSearch mmsv={mmsv} dataItems={dataItems} />
        ) : chosenButton == "2" && chosenTab == "1" ? (
          <CodesSchedulesSearch
            codesSchedulesDataJson={codesSchedulesDataJson}
          />
        ) : (
          <div className={styles.errorBox}>
            {logError("Item", "is not available")}
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-17.uksouth.logic.azure.com/workflows/0eddf883c64d48d0939b18549894fe2e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qmkujig7GnFXCDXAXxVci2bH9VtUPMyyEwlyEibylvI`
  );
  const dataJson = await dataReq.json();
  const dashboards = dataJson.dashboards;
  const sections = dataJson.sections;
  const items = dataJson.items;

  const getLatestVersions = await fetch(
    `https://prod-02.uksouth.logic.azure.com:443/workflows/42c048e7e8dc41758ed35c02ff7b4de7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6P22c3SoD1TzE42D8fz1HCWKFo4u-l34pRvtnf2i47g`
  );
  const latestVersionJson = await getLatestVersions.json();

  const newsDataReq = await fetch(
    "https://prod2-21.uksouth.logic.azure.com:443/workflows/3b40d5e4e24449e187511befe44b600b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ikzFKQ4CtAXK2-HMi8rjTZ5Is_ho1YnNGDCNg8t0HRk"
  );
  const latestNewsJson = await newsDataReq.json();
  const newsData = latestNewsJson.latestNews;

  const codesSchedulesDataReq = await fetch(
    `https://prod-21.uksouth.logic.azure.com:443/workflows/08cc6cb613f24c20b8b7d61e707852ed/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Lu9fcr6ePmGgjIEsHIwQ8y64Xewe1lsErD-FDxYKSCM`
  );
  const codesSchedulesDataJson = await codesSchedulesDataReq.json();
  const dataSpecData = await fetch(
    `https://prod-24.uksouth.logic.azure.com:443/workflows/dcb64fdc2eea43aa8e231cb7035ff20d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6fNJtJqCiH8TYdaftlFMPn1nuUE5KNLopKDvuU9WRV8`
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
      codesSchedulesDataJson
    }
  };
}
