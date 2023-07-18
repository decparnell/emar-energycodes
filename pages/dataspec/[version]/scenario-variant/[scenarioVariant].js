import styles from "../../../../styles/schedules-dataspec.module.css";
import Head from "next/head";
import AppContext from "../../../../components/context/AppContext";
import SideNav from "../../../../components/dashboardSideNav";
import { useState, useContext, useEffect } from "react";
import { checkIfItemsAvailableInArray } from "../../../../components/helperFunctions/checkIfItemsAvailableInArray";
import { checkIfVariablesAreAvailable } from "../../../../components/helperFunctions/checkIfVariablesAreAvailable";
import ScenarioVariantTables from "../../../../components/tables/scenarioVariantTables";
import SecondNavbar from "../../../../components/layout/secondHeader";

function ScenarioPage({ scenarioVariantInfo, structure, marketMsgInfo }) {

  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;

  let dashboard = [
    { dashboardId: "BasicInformation", dashboardSectionName: "Basic Information", dashboardSectionOrder: 1 },
    { dashboardId: "Structure", dashboardSectionName: "Structure", dashboardSectionOrder: 2 },
  ];

  const apiVarList = [
    { obj: scenarioVariantInfo, name: "scenarioVariantInfo" },
    { obj: marketMsgInfo, name: "mmInfo" },
    { obj: structure, name: "structure" },
  ];

  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  const svInfo = scenarioVariantInfo ? scenarioVariantInfo[0] : null;
  const mmInfo = marketMsgInfo ? marketMsgInfo[0] : null;

  let svInfoBody = { ...svInfo, DTCDcode: mmInfo.DTCDcode, MessageVersionNumber: mmInfo.MessageVersionNumber }

  //Left Navigation Bar
  const [currentSections, setCurrentSections] = useState(() => {
    if (checkIfItemsAvailableInArray(internalErrorLog, "sections")) {
      return dashboard[0];
    }
  });

  useEffect(() => {
  }, [currentSections]);

  return (
    <>
      <Head>
        <title>
          EMAR - {svInfo.EnergyMarketMessageScenarioVariantName}
        </title>
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
            <ScenarioVariantTables keyTitle="Basic Information" latestDataSpecVersion={latestDataSpecVersion} dataBody={svInfoBody} />
          </section>
          <section id={dashboard[1].dashboardId}>
            <ScenarioVariantTables keyTitle="Structure" latestDataSpecVersion={latestDataSpecVersion} dataBody={structure} />
          </section>
        </div>
      </div>
    </>
  )


}

export default ScenarioPage;

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API  
  //getScenarioVariantFlowStructure-LogicApp-v2
  const dataReq = await fetch(
    `https://prod-05.uksouth.logic.azure.com/workflows/e1ef29bc721e4135a5e3627156ab461b/triggers/manual/paths/invoke/scenarioVariant/${context.params.scenarioVariant}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=oNkEfItUN3uR584yHQuV8_52nIOYoDdYDXpTv896Hk4`
  );

  const dataJson = await dataReq.json();
  const scenarioVariantInfo = dataJson.scenarioVariantInfo;
  const structure = dataJson.structure;
  const marketMsgInfo = dataJson.mminfo;

  // Pass data to the page via props
  return { props: { scenarioVariantInfo, structure, marketMsgInfo } };
}
