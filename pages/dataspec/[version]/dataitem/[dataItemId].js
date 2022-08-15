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
  useEffect(() => {
    // Client-side-only code
    value.setLatestDataSpecVersion(sessionStorage.getItem("version"));
  });
  const dataItemInfo = searchResults[0];
  const mmForDataItem = searchResults[1];
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
        <h2 className={styles.svHeader}>
          The Market Messages for this Data Item are:
        </h2>
        <table className={styles.svList}>
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
                passHref={true}
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
  const searchResults = [dataJson.dataItemInfo[0], dataJson.mmList];

  // Pass data to the page via props
  return { props: { searchResults } };
}
