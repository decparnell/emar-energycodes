import styles from "../../../../styles/dataspec.module.css";
import Link from "next/link";
import removeNullValues from "../../../../components/dataspec/functions/removeNulls";
import AppContext from "../../../../components/context/AppContext";
import { useContext, useEffect } from "react";
import Head from "next/head";
import SecondNavbar from "../../../../components/layout/secondHeader";

function DiDetailPage({ searchResults }) {
  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;
  const dataItemInfo = searchResults[0];
  const mmForDataItem = searchResults[1];
  const dataEnumerations = searchResults[2];

  const legacy =
    removeNullValues(dataItemInfo.DTCLegacyReference) +
    removeNullValues(dataItemInfo.SPAALegacyReference) +
    removeNullValues(dataItemInfo.RGMALegacyReference) +
    removeNullValues(dataItemInfo.UNCDataItemReference) +
    removeNullValues(dataItemInfo.IUCDataItemReference) +
    removeNullValues(dataItemInfo.DCUSADataItemReference);

  return (
    <>
      <SecondNavbar />
      <div className={styles.contentContainer}>
        <Head>
          <title>EMAR - {dataItemInfo.DataItemName}</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <div className={styles.flexContainer}>
          <div className={styles.fullBoxTable}>
            <h1 className={styles.contentTitle}>
              {dataItemInfo.DataItemIdentifier} - {dataItemInfo.DataItemName}
            </h1>
            <table className={styles.fullWidthTable}>
              <tbody>
                <tr>
                  <td className={styles.mmTable}>Local Catalogue Reference</td>
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
                  <td className={styles.mmTable}>Logical Decimal Length</td>
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
          {dataEnumerations.length > 0 && (
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
          )}
          <div
            className={
              dataEnumerations.length > 0
                ? styles.halfBoxTable
                : styles.fullBoxTable
            }
          >
            <h2 className={styles.svHeader}>The Market Messages</h2>
            <table
              className={
                dataEnumerations.length > 0
                  ? styles.svList
                  : styles.fullWidthTable
              }
            >
              <thead>
                <th>Market Message Id</th>
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
                      <td>{entry.Label}</td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DiDetailPage;

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-02.uksouth.logic.azure.com/workflows/5454d5de7bcc4ce59f905b0ceeb6a778/triggers/manual/paths/invoke/searchType/{searchType}/searchValue/${context.params.dataItemId}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PjsWaPjm_aHA3QcaiqNmWXg7OVtbegI-ZA2gwZnNnoc`
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
