import styles from "../../styles/home.module.css";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import AppContext from "../../components/context/AppContext";
import { logMessage } from "../../components/helperFunctions/logMessage";
import QuickLink from "../../components/helperFunctions/quickLink";
import SideNav from "../../components/dashboardSideNav";
import { BiData, BiTable } from "react-icons/bi";
import { TiHtml5 } from "react-icons/ti";
import DashboardLink from "../../components/dashboardLink";
import { LogUserInfo } from "../../components/logging";
import SecondNavbar from "../../components/layout/secondHeader";
import ChangeRequestStages from "../../components/changeRequestStages";
import { changeRegister } from "../../components/settings";
import DashboardSearch from "../../components/dashboardSearch";
function DataSpec({ sections, items }) {
  useEffect(() => {
    LogUserInfo("Data Spec Page");
    value.setChosenTab("Data Specification");
    value.setSearchType({ name: "Market Messages" });
    value.setSearchValue("");
  }, []);

  const value = useContext(AppContext);
  let { chosenTab } = value.state;

  const [currentSections, setCurrentSections] = useState(sections[0]);

  const [currentItems, setCurrentItems] = useState(() => {
    return items.filter(
      (item) =>
        item.dashboardSectionId_FK === currentSections.dashboardSectionId
    );
  });

  useEffect(() => {
    if (currentSections.dashboardSectionName === "All") {
      setCurrentItems(items);
    } else {
      setCurrentItems(
        items.filter(
          (item) =>
            item.dashboardSectionId_FK === currentSections.dashboardSectionId
        )
      );
    }
  }, [currentSections]);

  const [insertError, setInsertError] = useState("");

  return (
    <>
      {insertError && (
        <div className={styles.errorBox}>{logMessage(insertError)}</div>
      )}
      <div className={"container-flex"}>
        <Head>
          <title>EMAR Dashboards</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <div className={"side-nav-container"}>
          <SideNav
            items={sections}
            name="dashboardSectionName"
            stateVar={currentSections}
            stateSet={setCurrentSections}
          />
        </div>
        <div className={styles.mainContentContainer}>
          <div className={styles.top}>
            <div className={`${styles.left} box`}>
              <h6 className="boxTitle">
                {currentSections.dashboardSectionName}
              </h6>
              <DashboardLink currentItems={currentItems} />
            </div>
            <div className={`${styles.right}`}>
              <div className={`${styles.secondNavbar}`}>
                <SecondNavbar pageType="Data Spec Page" />
              </div>
              <div className={`${styles.quickLinkContainer}`}>
                <DashboardSearch
                  searchType="Data Specification"
                  searchLink="/dataspec/search"
                />
              </div>
              <div className={`${styles.upcomingChangesContent} box`}>
                <ChangeRequestStages processStageData={changeRegister} />
              </div>
            </div>
          </div>
          <div className={`${styles.prereleaseContent} box`}>
            <h6 className={`boxTitle ${styles.boxTitle}`}>
              Pre-Release Information
            </h6>
            <div className={styles.iconBox}>
              <div className={styles.image}>
                <BiData className={styles.preicon} />
                <p className={styles.pretext}>SQL Database</p>
              </div>
              <div className={styles.image}>
                <BiTable className={styles.preicon} />
                <p className={styles.pretext}>Access Database</p>
              </div>
              <div className={styles.image}>
                <TiHtml5 className={styles.preicon} />
                <p className={styles.pretext}>HTML File</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataSpec;

// This gets called on every request
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20000, stale-while-revalidate=59"
  );

  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-04.uksouth.logic.azure.com/workflows/4db80aa335be4311b0a1a8d80cc7c504/triggers/manual/paths/invoke/Data Specification?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rzSvBbeSA3spIYX1gDBk10Bam3XBduOo5vvY1kYYLPA`
  );
  const dataJson = await dataReq.json();
  const sections = dataJson.sections;
  const lastDashboardSectionOrder =
    sections[sections.length - 1].dashboardSectionOrder + 1;
  sections.push({
    dashboardId_FK: null,
    dashboardSectionId: null,
    dashboardSectionName: "All",
    dashboardSectionOrder: lastDashboardSectionOrder,
  });
  const items = dataJson.items;

  /*   const getProcessStgData = await fetch(
    "https://get-changerequest-from-recportal.azurewebsites.net/api/getchangerequestfromrecportal"
  );
  const processStageData = await getProcessStgData.json(); */
  // Pass data to the page via props
  return {
    props: {
      sections,
      items,
    },
  };
}
