import styles from "../../../../styles/dataspec.module.css";
import Link from "next/link";
import removeNullValues from "../../../../components/dataspec/functions/removeNulls";
import addPaddingToGroupId from "../../../../components/dataspec/functions/addIdPadding";
import AppContext from "../../../../components/context/AppContext";
import { useContext, useEffect } from "react";
import Head from "next/head";
import SecondNavbar from "../../../../components/layout/secondHeader";

function MmDetailPage({ searchResults }) {
  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;
  const marketMessageInfo = searchResults[0];
  const svForMarketMessage = searchResults[1];
  const dataItems = searchResults[2];

  const legacy =
    removeNullValues(marketMessageInfo.DTCDcode) +
    removeNullValues(marketMessageInfo.CSSMessageIdentifier) +
    removeNullValues(marketMessageInfo.LegacyRGMAMessageIdentifier) +
    removeNullValues(marketMessageInfo.LegacySPAAMessageIdentifier) +
    removeNullValues(marketMessageInfo.UNCMessageIdentifier);

  const dataItemsTableHead = ["Data Item Id", "Data Item Name"];

  return (
    <>
      <SecondNavbar />
      <div className={styles.contentContainer}>
        <Head>
          <title>EMAR - {marketMessageInfo.Label}</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <h1 className={styles.contentTitle}>
          {marketMessageInfo.EnergyMarketMessageIdentifier} -{" "}
          {marketMessageInfo.Label}
        </h1>
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
                {addPaddingToGroupId(marketMessageInfo.MessageVersionNumber)}
              </td>
            </tr>
            <tr>
              <td className={styles.mmTable}>Notes</td>
              <td>{marketMessageInfo.ExternalNotes}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <h2 className={styles.svHeader}>The Data items message contains:</h2>
          <table className={styles.svList}>
            <thead>
              {dataItemsTableHead.map((item) => (
                <th>{item}</th>
              ))}
            </thead>
            <tbody>
              {dataItems.map((entry) => (
                <Link
                  key={entry.DataItemIdentifier}
                  href={{
                    pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[di]`,
                    query: {
                      di: entry.DataItemIdentifier
                    }
                  }}
                  passHref={true}
                >
                  <tr key={entry.DataItemIdentifier} className={styles.pointer}>
                    <td>{entry.DataItemIdentifier}</td>
                    <td>{entry.DataItemName}</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
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
                    sv: entry.EnergyMarketMessageScenarioVariantIdentifier
                  }
                }}
                passHref={true}
              >
                <tr
                  key={entry.EnergyMarketMessageScenarioVariantIdentifier}
                  className={styles.pointer}
                >
                  <td>{entry.EnergyMarketMessageScenarioVariantIdentifier}</td>
                  <td>{entry.EnergyMarketMessageScenarioVariantName}</td>
                  <td>{entry.SourceMarketDataServiceName}</td>
                  <td>{entry.TargetMarketDataServiceName}</td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
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
    dataJson.dataItemList
  ];

  // Pass data to the page via props
  return { props: { searchResults } };
}
