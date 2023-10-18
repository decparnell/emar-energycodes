import styles from "../styles/home.module.css";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { checkIfVariablesAreAvailable } from "../components/helperFunctions/checkIfVariablesAreAvailable";
import { checkIfItemsAvailableInArray } from "../components/helperFunctions/checkIfItemsAvailableInArray";
import { logMessage } from "../components/helperFunctions/logMessage";
import QuickLink from "../components/helperFunctions/quickLink";
import SideNav from "../components/dashboardSideNav";
import { BiSearchAlt2 } from "react-icons/bi";
import { LogUserInfo } from "../components/logging";
import DashboardLink from "../components/dashboardLink";
import ChangeRequestStages from "../components/changeRequestStages";
import SecondNavBar from "../components/layout/secondHeader";
import { changeRegister } from "../components/settings";
import DashboardSearch from "../components/dashboardSearch";
import AppContext from "../components/context/AppContext";
import { customSortFunction } from "../components/helperFunctions/sortingFunction";

function HomePage({ sections, items, newsData }) {
  const value = useContext(AppContext);
  const router = useRouter();

  const apiVarList = [
    { obj: newsData, name: "newsData" },
    { obj: items, name: "items" },
    { obj: sections, name: "sections" },
  ];

  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  const [currentSections, setCurrentSections] = useState(() => {
    if (checkIfItemsAvailableInArray(internalErrorLog, "sections")) {
      return sections[0];
    }
  });

  const [currentItems, setCurrentItems] = useState(() => {
    return items.filter(
      (item) =>
        item.dashboardSectionId_FK === currentSections.dashboardSectionId
    );
  });

  useEffect(() => {
    if (currentSections.dashboardSectionName === "All") {
      setCurrentItems(items);
    } else if (currentSections.dashboardSectionName === "Codes Schedules Search") {
      router.push("/codes-schedules/search");
    }
    else {
      setCurrentItems(
        items.filter(
          (item) =>
            item.dashboardSectionId_FK === currentSections.dashboardSectionId
        )
      );
    }
  }, [currentSections]);

  useEffect(() => {
    LogUserInfo("HomePage");
    value.setSearchType({ name: "Codes Schedules" });
    value.setSearchValue("");
  }, []);

  const [insertError, setInsertError] = useState("");

  const search = (
    <BiSearchAlt2
      style={{
        height: "100%",
        width: "100%",
      }}
    />
  );
  return (
    <>
      {/* {checkIfItemsAvailableInArray(internalErrorLog, "newsData") ? (
        <NewsBanner news={newsData} />
      ) : null} */}
      {/* <TabNavbar />
      <ButtonNavbar /> */}
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
                <SecondNavBar pageType="HomePage" />
              </div>
              <div className={`${styles.quickLinkContainer}`}>
                <DashboardSearch
                  searchType="Codes Schedules"
                  searchLink="/codes-schedules/search"
                />
                {/* <QuickLink
                  title="Search"
                  link="/codes-schedules/search"
                  image={search}
                  width="15%"
                  height="49%"
                />
                <QuickLink title="" link="/" width="15%" height="49%" />
                <QuickLink title="" link="/" width="15%" height="49%" /> */}
              </div>
              <div className={`${styles.upcomingChangesContent} box`}>
                <ChangeRequestStages processStageData={changeRegister} />
              </div>
            </div>
          </div>
          <div className={`${styles.prereleaseContent} box`}>
            <h6 className="boxTitle">Pre-Release Information</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;


// This gets called on every request
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20000, stale-while-revalidate=59"
  );

  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-04.uksouth.logic.azure.com/workflows/4db80aa335be4311b0a1a8d80cc7c504/triggers/manual/paths/invoke/Schedules?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rzSvBbeSA3spIYX1gDBk10Bam3XBduOo5vvY1kYYLPA`
  );
  const dataJson = await dataReq.json();
  const sections = dataJson.sections;
  const lastDashboardSectionOrder = sections[sections.length - 1].dashboardSectionOrder + 1;
  sections.push({
    dashboardId_FK: null,
    dashboardSectionId: null,
    dashboardSectionName: "All",
    dashboardSectionOrder: lastDashboardSectionOrder,
  });
  sections.push({
    dashboardId_FK: null,
    dashboardSectionId: null,
    dashboardSectionName: "Codes Schedules Search",
    dashboardSectionOrder: lastDashboardSectionOrder + 1,
  });
  const itemsUnsorted = dataJson.items;
  const items = itemsUnsorted.sort((a, b) => customSortFunction(a, b, "dashboardSectionItemsName"));

  /*   const newsDataReq = await fetch(
    "https://prod-22.uksouth.logic.azure.com:443/workflows/e36d26ad83b04a86bc67b618e20c9dc5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Zymwu40i_cJZuIQhxAW9VZeDw22xzO97ie4sApLfizU"
  );
  const latestNewsJson = await newsDataReq.json();
  const newsData = latestNewsJson.latestNews; */
  // Pass data to the page via props
  return {
    props: {
      sections,
      items,
      //newsData,
    },
  };
}
