import styles from "../../../../styles/schedules-dataspec.module.css";
import Head from "next/head";
import SideNav from "../../../../components/dashboardSideNav";
import AppContext from "../../../../components/context/AppContext";
import { useState, useContext, useEffect } from "react";
import { checkIfItemsAvailableInArray } from "../../../../components/helperFunctions/checkIfItemsAvailableInArray";
import { checkIfsearchResultsAvailable } from "../../../../components/helperFunctions/checkIfsearchResultsAvailable";
import { checkIfVariablesAreAvailable } from "../../../../components/helperFunctions/checkIfVariablesAreAvailable/index";
import removeNullValues from "../../../../components/dataspec/functions/removeNulls";
import DataItemTables from "../../../../components/tables/dataItemTables";
import SecondNavbar from "../../../../components/layout/secondHeader";
import { LogUserInfo } from "../../../../components/logging";

function DataItemDetailsPage({ searchResults }) {
  const pageId = "DataItemDetailsPage";
  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;

  let dashboard = [
    {
      dashboardId: "BasicInformation",
      dashboardSectionName: "Basic Information",
      dashboardSectionOrder: 1,
    },
  ];

  let apiVarList = [{ obj: dashboard, name: "sections" }];

  //Data and SearchResults
  const searchRes = checkIfsearchResultsAvailable(searchResults, pageId);
  apiVarList.push(...searchRes);

  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  const dataItemInfo =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "dataItemInfo")
      ? searchResults[0]
      : null;

  const dataEnumerations =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "dataEnumerations")
      ? searchResults[2]
      : null;

  dataEnumerations.length > 0
    ? dashboard.push({
        dashboardId: "DataEnumerations",
        dashboardSectionName: "Data Enumerations",
        dashboardSectionOrder: 2,
      })
    : null;

  const mmForDataItem =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "mmForDataItem")
      ? searchResults[1]
      : null;
  mmForDataItem.length > 0
    ? dashboard.push({
        dashboardId: "MarketMessages",
        dashboardSectionName: "Market Messages",
        dashboardSectionOrder: 3,
      })
    : null;

  const legacy =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "dataItemInfo")
      ? //if there is a null value , it replaces it with ""
        removeNullValues(dataItemInfo.DTCLegacyReference) +
        removeNullValues(dataItemInfo.SPAALegacyReference) +
        removeNullValues(dataItemInfo.RGMALegacyReference) +
        removeNullValues(dataItemInfo.UNCDataItemReference) +
        removeNullValues(dataItemInfo.IUCDataItemReference) +
        removeNullValues(dataItemInfo.DCUSADataItemReference)
      : null;

  //Left Navigation Bar
  const [currentSections, setCurrentSections] = useState(() => {
    if (checkIfItemsAvailableInArray(internalErrorLog, "sections")) {
      return dashboard[0];
    }
  });

  useEffect(() => {
    LogUserInfo(
      `${dataItemInfo.DataItemIdentifier} ${dataItemInfo.DataItemName}`
    );
    value.setChosenTab("Data Specification");
  }, []);
  return (
    <>
      <Head>
        <title>EMAR - {dataItemInfo.DataItemName}</title>
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
            <DataItemTables
              keyTitle="Basic Information"
              latestDataSpecVersion={latestDataSpecVersion}
              dataBody={dataItemInfo}
              legacy={legacy}
            />
          </section>
          <section id={dashboard[1]?.dashboardId}>
            <DataItemTables
              keyTitle="Data Enumerations"
              latestDataSpecVersion={latestDataSpecVersion}
              dataBody={dataEnumerations}
            />
          </section>
          <section id={dashboard[2]?.dashboardId}>
            <DataItemTables
              keyTitle="Market Messages"
              latestDataSpecVersion={latestDataSpecVersion}
              dataBody={mmForDataItem}
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default DataItemDetailsPage;

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-28.uksouth.logic.azure.com/workflows/e4bbba13f520488ea5594563501811a0/triggers/manual/paths/invoke/searchType/{searchType}/searchValue/${context.params.dataItemId}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iW7V0i46HByptwH0eKAUbSEbkTjrwAXEjDHw8rEDlgk`
  );
  const dataJson = await dataReq.json();
  const searchResults = [
    dataJson.dataItemInfo[0],
    dataJson.mmList,
    dataJson.enumerations,
  ];

  // Pass data to the page via props
  return { props: { searchResults } };
}
