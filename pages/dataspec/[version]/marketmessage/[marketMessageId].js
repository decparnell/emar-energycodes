import styles from "../../../../styles/scenarioVariant.module.css";
import AppContext from "../../../../components/context/AppContext";
import { useState, useContext, useEffect } from "react";
import SideNav from "../../../../components/dashboardSideNav";
import removeNullValues from "../../../../components/dataspec/functions/removeNulls";
import { checkIfVariablesAreAvailable } from "../../../../components/helperFunctions/checkIfVariablesAreAvailable";
import { checkIfItemsAvailableInArray } from "../../../../components/helperFunctions/checkIfItemsAvailableInArray";
import { checkIfsearchResultsAvailable } from "../../../../components/helperFunctions/checkIfsearchResultsAvailable";
import MarketMessageTables from "../../../../components/tables/marketMessageTables";

function MarketMessagePage({ searchResults }) {
<<<<<<< HEAD
=======

  const pageId = "MarketMessagePage"

>>>>>>> 6db7efe74ab0384e7e16becac4e796a2afd1b039
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
<<<<<<< HEAD
  const searchRes = checkIfsearchResultsAvailable(searchResults);
  apiVarList.push(...searchRes);
=======
  const searchRes = checkIfsearchResultsAvailable(searchResults, pageId)
  apiVarList.push(...searchRes)
>>>>>>> 6db7efe74ab0384e7e16becac4e796a2afd1b039

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

<<<<<<< HEAD
  console.log("currentSections", currentSections);
  useEffect(() => {}, [currentSections]);
=======
  useEffect(() => {
  }, [currentSections]);
>>>>>>> 6db7efe74ab0384e7e16becac4e796a2afd1b039

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.sideNavContainer}`}>
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
  const dataReq = await fetch(
    `https://prod-00.uksouth.logic.azure.com/workflows/5274b717bcf04104a6e99b41704c1698/triggers/manual/paths/invoke/searchType/{searchType}/searchValue/${context.params.marketMessageId}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xmOj_s9acsMTWSJyIwmmg__Qomwbd2rns4FuXcgklDo`
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
