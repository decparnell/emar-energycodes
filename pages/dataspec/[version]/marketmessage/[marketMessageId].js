import styles from "../../../../styles/schedules-dataspec.module.css";
import Head from "next/head";
import AppContext from "../../../../components/context/AppContext";
import { useState, useContext, useEffect } from "react";
import SideNav from "../../../../components/dashboardSideNav";
import removeNullValues from "../../../../components/dataspec/functions/removeNulls";
import { checkIfVariablesAreAvailable } from "../../../../components/helperFunctions/checkIfVariablesAreAvailable";
import { checkIfItemsAvailableInArray } from "../../../../components/helperFunctions/checkIfItemsAvailableInArray";
import { checkIfsearchResultsAvailable } from "../../../../components/helperFunctions/checkIfsearchResultsAvailable";
import MarketMessageTables from "../../../../components/tables/marketMessageTables";
import SecondNavbar from "../../../../components/layout/secondHeader";
import { LogUserInfo } from "../../../../components/logging";

function MarketMessagePage({ searchResults }) {
  const pageId = "MarketMessagePage";

  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;

  let dashboard = [
    {
      dashboardId: "BasicInformation",
      dashboardSectionName: "Basic Information",
      dashboardSectionOrder: 1,
    },
    {
      dashboardId: "DataItems",
      dashboardSectionName: "Data Items",
      dashboardSectionOrder: 2,
    },
    {
      dashboardId: "ScenarioVariants",
      dashboardSectionName: "Scenario Variants",
      dashboardSectionOrder: 3,
    },
  ];

  let apiVarList = [{ obj: dashboard, name: "sections" }];

  //Data and SearchResults
  const searchRes = checkIfsearchResultsAvailable(searchResults, pageId);
  apiVarList.push(...searchRes);

  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  const marketMessageInfo =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "marketMessageInfo")
      ? searchResults[0]
      : null;

  const svForMarketMessage =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "svForMarketMessage")
      ? searchResults[1]
      : null;

  const dataItems =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "dataItems")
      ? searchResults[2]
      : null;

  const legacy =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "marketMessageInfo")
      ? removeNullValues(marketMessageInfo.DTCDcode) +
        removeNullValues(marketMessageInfo.CSSMessageIdentifier) +
        removeNullValues(marketMessageInfo.LegacyRGMAMessageIdentifier) +
        removeNullValues(marketMessageInfo.LegacySPAAMessageIdentifier) +
        removeNullValues(marketMessageInfo.UNCMessageIdentifier)
      : null;

  const showApiColumns =
    //create a list of items that have ApiMethod or ApiRoute available
    svForMarketMessage.find((el) => el.ApiMethod || el.ApiRoute) !== undefined;

  //Left Navigation Bar
  const [currentSections, setCurrentSections] = useState(() => {
    if (checkIfItemsAvailableInArray(internalErrorLog, "sections")) {
      return dashboard[0];
    }
  });

  useEffect(() => {}, [currentSections]);

  useEffect(() => {
    LogUserInfo(
      `VIEW:  ${marketMessageInfo.EnergyMarketMessageIdentifier} - ${marketMessageInfo.Label}`
    );
    value.setChosenTab("Data Specification");
  }, []);

  return (
    <>
      <Head>
        <title>EMAR - {marketMessageInfo.Label}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={"container-flex"}>
        <div className={"side-nav-container-fixed"}>
          <SideNav
            navbarType="ContentBasedNavBar"
            items={dashboard}
            dashboardId="dashboardId"
            name="dashboardSectionName"
            stateVar={currentSections}
            stateSet={setCurrentSections}
          />
        </div>
        <div className={`${styles.mainContentContainer}`}>
          <SecondNavbar />
          <section id={dashboard[0].dashboardId}>
            <MarketMessageTables
              keyTitle="Basic Information"
              latestDataSpecVersion={latestDataSpecVersion}
              dataBody={marketMessageInfo}
              legacy={legacy}
            />
          </section>
          <section id={dashboard[1].dashboardId}>
            <MarketMessageTables
              keyTitle="Data Items"
              latestDataSpecVersion={latestDataSpecVersion}
              dataBody={dataItems}
            />
          </section>
          <section id={dashboard[2].dashboardId}>
            <MarketMessageTables
              keyTitle="Scenario Variant"
              latestDataSpecVersion={latestDataSpecVersion}
              dataBody={svForMarketMessage}
              showApiColumns={showApiColumns}
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default MarketMessagePage;

// This gets called on every request
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=20000, stale-while-revalidate=59"
  );

  //Content Data
  //getMarketMessageFlowStructure-LogicApp-v2
  const dataReq = await fetch(
    `https://prod-27.uksouth.logic.azure.com/workflows/928cf6d8fa974b3ca55ae021f119e4bb/triggers/manual/paths/invoke/searchType/{searchType}/searchValue/${context.params.marketMessageId}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oUMwgTRLhqptkIX8IjSR1y6MB2B0wAMgZiQCKpMaGw0`
  );

  const dataJson = await dataReq.json();
  const searchResults = [
    dataJson.marketMessageInfo[0],
    dataJson.svList,
    dataJson.dataItemList,
  ];

  // Pass data to the page via props
  return {
    props: {
      searchResults,
    },
  };
}
