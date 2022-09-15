import styles from "../../../../styles/dataspec.module.css";
import Link from "next/link";
import removeNullValues from "../../../../components/dataspec/functions/removeNulls";
import addPaddingToGroupId from "../../../../components/dataspec/functions/addIdPadding";
import AppContext from "../../../../components/context/AppContext";
import { useContext, useEffect } from "react";
import Head from "next/head";
import SecondNavbar from "../../../../components/layout/secondHeader";
import { checkIfVariablesAreAvailable } from "../../../../components/helperFunctions/checkIfVariablesAreAvailable";
import { logError } from "../../../../components/helperFunctions/logError";

function MmDetailPage({ searchResults }) {
  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;

  let apiVarList = [];
  const checkIfsearchResultsAvailable = () => {
    if (searchResults) {
      apiVarList = [
        {
          obj: searchResults,
          name: "searchResults",
        },
        { obj: searchResults[0], name: "marketMessageInfo" },
        { obj: searchResults[1], name: "svForMarketMessage" },
        { obj: searchResults[2], name: "dataItems" },
      ];
    } else {
      apiVarList = [
        {
          obj: searchResults,
          name: "searchResults",
        },
      ];
    }
  };

  checkIfsearchResultsAvailable();
  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  const marketMessageInfo =
    internalErrorLog.indexOf("searchResults") === -1 &&
    internalErrorLog.indexOf("marketMessageInfo") === -1
      ? searchResults[0]
      : null;
  const svForMarketMessage =
    internalErrorLog.indexOf("searchResults") === -1 &&
    internalErrorLog.indexOf("svForMarketMessage") === -1
      ? searchResults[1]
      : null;
  const dataItems =
    internalErrorLog.indexOf("searchResults") === -1 &&
    internalErrorLog.indexOf("dataItems") === -1
      ? searchResults[2]
      : null;

  const legacy =
    internalErrorLog.indexOf("searchResults") === -1 &&
    internalErrorLog.indexOf("marketMessageInfo") === -1
      ? removeNullValues(marketMessageInfo.DTCDcode) +
        removeNullValues(marketMessageInfo.CSSMessageIdentifier) +
        removeNullValues(marketMessageInfo.LegacyRGMAMessageIdentifier) +
        removeNullValues(marketMessageInfo.LegacySPAAMessageIdentifier) +
        removeNullValues(marketMessageInfo.UNCMessageIdentifier)
      : null;

  const dataItemsTableHead = [
    "Data Item Id",
    "Local Catalogue Reference",
    "Data Item Name",
  ];

  return (
    <>
      <SecondNavbar />
      {internalErrorLog.indexOf("searchResults") === -1 ? (
        <div className={styles.contentContainer}>
          {internalErrorLog.indexOf("marketMessageInfo") === -1 ? (
            <div>
              <Head>
                <title>EMAR - {marketMessageInfo.Label}</title>
                <meta property="og:title" content="My page title" key="title" />
              </Head>
              <h1 className={styles.contentTitle}>
                {marketMessageInfo.EnergyMarketMessageIdentifier} -{" "}
                {marketMessageInfo.Label}
              </h1>
            </div>
          ) : (
            <div className={styles.errorBox}>
              {logError("Market Message Info", "is not available")}
            </div>
          )}
          {internalErrorLog.indexOf("marketMessageInfo") === -1 && (
            <table className={styles.fullWidthTable}>
              <tbody>
                <tr>
                  <td className={styles.mmTable}>Local Catalogue Reference</td>
                  <td>{removeNullValues(legacy)}</td>
                </tr>
                <tr>
                  <td className={styles.mmTable}>Description</td>
                  <td>{marketMessageInfo.Description}</td>
                </tr>
                <tr>
                  <td className={styles.mmTable}>Version Number</td>
                  <td>
                    {addPaddingToGroupId(
                      marketMessageInfo.MessageVersionNumber
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={styles.mmTable}>Notes</td>
                  <td>{marketMessageInfo.ExternalNotes}</td>
                </tr>
              </tbody>
            </table>
          )}
          {internalErrorLog.indexOf("dataItems") === -1 ? (
            <div>
              <h2 className={styles.svHeader}>
                The Data items message contains:
              </h2>
              <table className={styles.svList}>
                <thead>
                  {dataItemsTableHead.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </thead>
                <tbody>
                  {dataItems.map((entry) => (
                    <Link
                      key={entry.DataItemIdentifier}
                      href={{
                        pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[di]`,
                        query: {
                          di: entry.DataItemIdentifier,
                        },
                      }}
                      passHref={true}
                    >
                      <tr className={styles.pointer}>
                        <td>{entry.DataItemIdentifier}</td>
                        <td>
                          {removeNullValues(entry.DTCLegacyReference) +
                            removeNullValues(entry.SPAALegacyReference) +
                            removeNullValues(entry.RGMALegacyReference) +
                            removeNullValues(entry.UNCDataItemReference) +
                            removeNullValues(entry.IUCDataItemReference) +
                            removeNullValues(entry.DCUSADataItemReference)}
                        </td>
                        <td>{entry.DataItemName}</td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.errorBox}>
              {logError(
                "Data Item for this Market Message",
                "is not available"
              )}
            </div>
          )}

          {internalErrorLog.indexOf("svForMarketMessage") === -1 ? (
            <div>
              <h2 className={styles.diHeader}>
                The Scenario Vaiants for this message are:
              </h2>
              <table className={styles.diList}>
                <thead>
                  <th>Variant Id</th>
                  <th>SV Name</th>
                  <th>Source</th>
                  <th>Target</th>
                </thead>
                <tbody>
                  {svForMarketMessage.map((entry) => (
                    <Link
                      key={entry.EnergyMarketMessageScenarioVariantIdentifier}
                      href={{
                        pathname: `/dataspec/${latestDataSpecVersion}/scenario-variant/[sv]`,
                        query: {
                          sv: entry.EnergyMarketMessageScenarioVariantIdentifier,
                        },
                      }}
                      passHref={true}
                    >
                      <tr
                        key={entry.EnergyMarketMessageScenarioVariantIdentifier}
                        className={styles.pointer}
                      >
                        <td>
                          {entry.EnergyMarketMessageScenarioVariantIdentifier}
                        </td>
                        <td>{entry.EnergyMarketMessageScenarioVariantName}</td>
                        <td>{entry.SourceMarketDataServiceName}</td>
                        <td>{entry.TargetMarketDataServiceName}</td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.errorBox}>
              {logError(
                "Scenario Varient for this MarketMessage",
                "is not available"
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.errorBox}>
          {logError("Market Message Info", "is not available")}
        </div>
      )}
    </>
  );
}

export default MmDetailPage;

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-00.uksouth.logic.azure.com/workflows/0b5552f9640a441891edf1f4bf678372/triggers/manual/paths/invoke/searchType/1/searchValue/${context.params.marketMessageId}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=q2SEdJOh6ncM2DVx2-YhplordGojLu-b77vRZnIJDQY`
  );
  const dataJson = await dataReq.json();
  const searchResults = [
    dataJson.marketMessageInfo[0],
    dataJson.svList,
    dataJson.dataItemList,
  ];

  // Pass data to the page via props
  return { props: { searchResults } };
}
