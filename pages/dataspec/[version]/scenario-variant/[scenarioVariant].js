import { useRouter } from "next/router";
import CreateFlowStructure from "../../../../components/dataspec/createFlowStructure";
import styles from "../../../../styles/dataspec.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Head from "next/head";
import SecondNavbar from "../../../../components/layout/secondHeader";
import Link from "next/link";
import AppContext from "../../../../components/context/AppContext";
import { useContext } from "react";
import { checkIfVariablesAreAvailable } from "../../../../components/helperFunctions/checkIfVariablesAreAvailable";
import { logError } from "../../../../components/helperFunctions/logError";

function ScenarioPage({
  scenarioVariantInfo,
  structure
  , mmInfo
}) {

  const svInfo = scenarioVariantInfo ? scenarioVariantInfo[0] : null;
  const marketMsgInfo = mmInfo ? mmInfo[0] : null;
  const router = useRouter();
  const scenarioVariant = router.query.scenarioVariant;
  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;

  const apiVarList = [
    { obj: scenarioVariantInfo, name: "scenarioVariantInfo" },
    { obj: structure, name: "structure" },
    { obj: mmInfo, name: "mmInfo" }
  ];
  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  return (
    <>
      <SecondNavbar />
      {internalErrorLog.indexOf("scenarioVariantInfo") === -1 ? (
        <div className={styles.contentContainer}>
          <Head>
            <title>
              EMAR - {svInfo.EnergyMarketMessageScenarioVariantName}
            </title>
            <meta property="og:title" content="My page title" key="title" />
          </Head>
          {internalErrorLog.indexOf("mmInfo") === -1 ? (
            <div>
              <h1 className={styles.contentTitle}>
                {scenarioVariant} -{" "}
                {svInfo.EnergyMarketMessageScenarioVariantName} (
                {marketMsgInfo.EnergyMarketMessageIdentifier} -{" "}
                {[
                  marketMsgInfo.DTCDcode,
                  marketMsgInfo.LegacyRGMAMessageIdentifier,
                  marketMsgInfo.LegacySPAAMessageIdentifier,
                  marketMsgInfo.UNCMessageIdentifier,
                  marketMsgInfo.CSSMessageIdentifier
                ]}
                )
              </h1>
              <table className={styles.fullWidthTable}>
                <tr>
                  <td className={styles.tableHearSide}>Name</td>
                  <td>{svInfo.EnergyMarketMessageScenarioVariantName}</td>
                </tr>
                <tr>
                  <td className={styles.tableHearSide}>Description</td>
                  <td>
                    {svInfo.EnergyMarketMessageScenarioVariantDescription}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableHearSide}>Owner</td>
                  <td>{svInfo.OwnerName}</td>
                </tr>
                <Link
                  href={{
                    pathname: `/dataspec/${latestDataSpecVersion}/marketmessage/[marketMessageId]`,
                    query: {
                      marketMessageId:
                        marketMsgInfo.EnergyMarketMessageIdentifier
                    }
                  }}
                  passHref={true}
                >
                  <tr className="pointer">
                    <td className={styles.tableHearSide}>Market Message Id</td>
                    <td>{marketMsgInfo.EnergyMarketMessageIdentifier}</td>
                  </tr>
                </Link>
                <Link
                  href={{
                    pathname: `/dataspec/${latestDataSpecVersion}/marketmessage/[marketMessageId]`,
                    query: {
                      marketMessageId:
                        marketMsgInfo.EnergyMarketMessageIdentifier
                    }
                  }}
                  passHref={true}
                >
                  <tr className="pointer">
                    <td className={styles.tableHearSide}>Local Reference</td>
                    <td>
                      {[
                        marketMsgInfo.DTCDcode,
                        marketMsgInfo.LegacyRGMAMessageIdentifier,
                        marketMsgInfo.LegacySPAAMessageIdentifier,
                        marketMsgInfo.UNCMessageIdentifier,
                        marketMsgInfo.CSSMessageIdentifier
                      ]}
                    </td>
                  </tr>
                </Link>
              </table>
            </div>
          ) : (
            <div className={styles.errorBox}>
              {logError("Market Message Info", "is not available")}
            </div>
          )}
          <div className={styles.sourcetargetContainer}>
            <div className={styles.source}>
              <p>{svInfo.SourceName}</p>
            </div>
            <AiOutlineArrowRight className={styles.sourceArrowTarget} />
            <div className={styles.target}>
              <p>{svInfo.TargetName}</p>
            </div>
          </div>
          {internalErrorLog.indexOf("structure") === -1 ? (
            CreateFlowStructure(structure)
          ) : (
            <div className={styles.errorBox}>
              {logError("Structure", "is not available")}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.errorBox}>
          {logError("Scenario Variant Info", "is not available")}
        </div>
      )}
    </>
  );
}

export default ScenarioPage;

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-24.uksouth.logic.azure.com/workflows/745e02a8a89c49caa6ebf5ee4d3102ab/triggers/manual/paths/invoke/scenarioVariant/${context.params.scenarioVariant}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=U4fk5dXXgeeHE5VbPydGMyA7ZUobST6KOGviXAwyuIg`
  );
  const dataJson = await dataReq.json();
  const scenarioVariantInfo = dataJson.scenarioVariantInfo;
  const structure = dataJson.structure;
  const mmInfo = dataJson.mmInfo;

  // Pass data to the page via props
  return { props: { scenarioVariantInfo, structure, mmInfo } };
}
