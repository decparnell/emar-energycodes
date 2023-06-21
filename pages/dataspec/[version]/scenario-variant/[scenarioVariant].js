import styles from "../../../../styles/scenarioVariant.module.css";
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

  let svInfoBody = {...svInfo, DTCDcode: mmInfo.DTCDcode, MessageVersionNumber: mmInfo.MessageVersionNumber}

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
  const dataReq = await fetch(
    `https://prod-12.uksouth.logic.azure.com/workflows/a8f5052aac70469c8e4de8990ef5289f/triggers/manual/paths/invoke/scenarioVariant/${context.params.scenarioVariant}/versionNumber/${context.params.version}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y8zRRQl2HM4BzMaVYcwnXoBCKqWgY3CHveRGzkstYIg`
  );
  const dataJson = await dataReq.json();
  const scenarioVariantInfo = dataJson.scenarioVariantInfo;
  const structure = dataJson.structure;
  const marketMsgInfo = dataJson.mminfo;

  // Pass data to the page via props
  return { props: { scenarioVariantInfo, structure, marketMsgInfo } };
}
