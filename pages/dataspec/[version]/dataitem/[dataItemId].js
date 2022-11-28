import styles from "../../../../styles/dataspec.module.css";
import Link from "next/link";
import removeNullValues from "../../../../components/dataspec/functions/removeNulls";
import AppContext from "../../../../components/context/AppContext";
import { useContext, useEffect } from "react";
import Head from "next/head";
import SecondNavbar from "../../../../components/layout/secondHeader";
import { checkIfVariablesAreAvailable } from "../../../../components/helperFunctions/checkIfVariablesAreAvailable/index";
import { logError } from "../../../../components/helperFunctions/logError";
import { checkIfItemsAvailableInArray } from "../../../../components/helperFunctions/checkIfItemsAvailableInArray/index";
import DocumentDownload from "../../../../components/documentDownload";

function DiDetailPage({ searchResults, url }) {
  let apiVarList = [];
  const checkIfsearchResultsAvailable = () => {
    //checks whether all the required item are within searchResults
    if (searchResults) {
      apiVarList = [
        {
          obj: searchResults,
          name: "searchResults"
        },
        { obj: searchResults[0], name: "dataItemInfo" },
        { obj: searchResults[1], name: "mmForDataItem" },
        { obj: searchResults[2], name: "dataEnumerations" }
      ];
    } else {
      apiVarList = [
        {
          obj: searchResults,
          name: "searchResults"
        }
      ];
    }
  };

  checkIfsearchResultsAvailable();
  //gets list(if any) of  unavailable items 
  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;

  const dataItemInfo =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "dataItemInfo")
      ? searchResults[0]
      : null;

  const mmForDataItem =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "mmForDataItem")
      ? searchResults[1]
      : null;

  const dataEnumerations =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "dataEnumerations")
      ? searchResults[2]
      : null;

  const legacy =
    checkIfItemsAvailableInArray(internalErrorLog, "searchResults") &&
    checkIfItemsAvailableInArray(internalErrorLog, "dataItemInfo")
    //if there is a null value , it replaces it with ""
      ? removeNullValues(dataItemInfo.DTCLegacyReference) +
        removeNullValues(dataItemInfo.SPAALegacyReference) +
        removeNullValues(dataItemInfo.RGMALegacyReference) +
        removeNullValues(dataItemInfo.UNCDataItemReference) +
        removeNullValues(dataItemInfo.IUCDataItemReference) +
        removeNullValues(dataItemInfo.DCUSADataItemReference)
      : null;
  return (
    <>
      <SecondNavbar />
      <DocumentDownload type="di" url={url} />
      {checkIfItemsAvailableInArray(internalErrorLog, "searchResults") ? (
        <div className={styles.contentContainer}>
          {checkIfItemsAvailableInArray(internalErrorLog, "dataItemInfo") ? (
            <div>
              <Head>
                <title>EMAR - {dataItemInfo.DataItemName}</title>
                <meta property="og:title" content="My page title" key="title" />
              </Head>
              <div className={styles.flexContainer}>
                <div className={styles.fullBoxTable}>
                  <h1 className={styles.contentTitle}>
                    {dataItemInfo.DataItemIdentifier} -{" "}
                    {dataItemInfo.DataItemName}
                  </h1>
                  <table className={styles.fullWidthTable}>
                    <tbody>
                      <tr>
                        <td className={styles.mmTable}>
                          Local Catalogue Reference
                        </td>
                        <td>{removeNullValues(legacy)}</td>
                      </tr>
                      <tr>
                        <td className={styles.mmTable}>Description</td>
                        <td>{dataItemInfo.DataItemDefinition}</td>
                      </tr>
                      <tr>
                        <td className={styles.mmTable}>Logical Length</td>
                        <td>{dataItemInfo.DataItemLogicalLength}</td>
                      </tr>
                      <tr>
                        <td className={styles.mmTable}>
                          Logical Decimal Length
                        </td>
                        <td>{dataItemInfo.DataItemLogicalDecimalLength}</td>
                      </tr>
                      <tr>
                        <td className={styles.mmTable}>Physical Length</td>
                        <td>{dataItemInfo.DataItemPhysicalLength}</td>
                      </tr>
                      <tr>
                        <td className={styles.mmTable}>Data Type</td>
                        <td>{dataItemInfo.DataTypeFormatRuleName}</td>
                      </tr>
                      <tr>
                        <td className={styles.mmTable}>Data Item Owner</td>
                        <td>{dataItemInfo.MarketRoleDataServiceName}</td>
                      </tr>
                      <tr>
                        <td className={styles.mmTable}>Notes</td>
                        <td>{dataItemInfo.ExternalNotes}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.errorBox}>{logError("Data Item Info")}</div>
          )}
          {checkIfItemsAvailableInArray(internalErrorLog, "dataEnumerations") &&
          dataEnumerations.length > 0 ? (
            <div className={styles.halfBoxTable}>
              <h2 className={styles.svHeader}>The Data Enumerations</h2>
              <table className={styles.svList}>
                <thead>
                  <th>Enumeration Value</th>
                  <th>Enumeration Description</th>
                </thead>
                <tbody>
                  {dataEnumerations.map((entry) => (
                    <tr key={entry.EnumerationValue} s>
                      <td>{entry.EnumerationValue}</td>
                      <td>{entry.EnumerationDescription}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : dataEnumerations.length == 0 ? null : (
            <div className={styles.errorBox}>
              {logError("Data Enumeration Value")}
            </div>
          )}
          {checkIfItemsAvailableInArray(internalErrorLog, "mmForDataItem") &&
          mmForDataItem.length > 0 ? (
            <div
              className={
                checkIfItemsAvailableInArray(
                  internalErrorLog,
                  "dataEnumerations"
                )
                  ? styles.halfBoxTable
                  : styles.fullBoxTable
              }
            >
              <h2 className={styles.svHeader}>The Market Messages</h2>
              <table
                className={
                  checkIfItemsAvailableInArray(
                    internalErrorLog,
                    "dataEnumerations"
                  )
                    ? styles.svList
                    : styles.fullWidthTable
                }
              >
                <thead>
                  <th>Market Message Id</th>
                  <th>Local Catalogue Reference</th>
                  <th>Market Message Name</th>
                </thead>
                <tbody>
                  {mmForDataItem.map((entry) => (
                    <Link
                      key={entry.EnergyMarketMessageIdentifier}
                      href={{
                        pathname: `/dataspec/${latestDataSpecVersion}/marketmessage/[mmid]`,
                        query: {
                          mmid: entry.EnergyMarketMessageIdentifier,
                        },
                      }}
                    >
                      <tr
                        key={entry.EnergyMarketMessageIdentifier}
                        className={styles.pointer}
                      >
                        <td>{entry.EnergyMarketMessageIdentifier}</td>
                        <td>
                          {removeNullValues(entry.DTCDcode) +
                            removeNullValues(
                              entry.LegacyRGMAMessageIdentifier
                            ) +
                            removeNullValues(
                              entry.LegacySPAAMessageIdentifier
                            ) +
                            removeNullValues(entry.UNCMessageIdentifier) +
                            removeNullValues(entry.CSSMessageIdentifier)}
                        </td>
                        <td>{entry.Label}</td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.errorBox}>
              {logError("Market Message Info")}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.errorBox}>{logError("Search Results")}</div>
      )}
    </>
  );
}

export default DiDetailPage;

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

  const urlFetch = await fetch(
    `https://prod-18.uksouth.logic.azure.com/workflows/ba54bba8972e48438cbb6f0571163ef0/triggers/manual/paths/invoke/searchValue/${context.params.dataItemId}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RO7KjzGq7_bdQqRL4PUPuSk3zzJFdZky3aumpoWCIS0`
  );
  const urlJson = await urlFetch.json();
  const url = urlJson.url;

  // Pass data to the page via props
  return { props: { searchResults, url } };
}
