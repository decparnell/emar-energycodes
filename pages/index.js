import styles from "../styles/home.module.css";
import Head from "next/head";
import Dashboard from "../components/dashboard";
import { useState, useEffect, useContext } from "react";
import AppContext from "../components/context/AppContext";
import { checkIfVariablesAreAvailable } from "../components/helperFunctions/checkIfVariablesAreAvailable";
import { checkIfItemsAvailableInArray } from "../components/helperFunctions/checkIfItemsAvailableInArray";
import { logMessage } from "../components/helperFunctions/logMessage";
import QuickLink from "../components/helperFunctions/quickLink";
import SideNav from "../components/dashboardSideNav";
import { BiRightArrow, BiSearchAlt2 } from "react-icons/bi";
import Link from "next/link";

function HomePage({ sections, items, newsData }) {
  const apiVarList = [
    { obj: newsData, name: "newsData" },
    { obj: items, name: "items" },
    { obj: sections, name: "sections" },
  ];
  const value = useContext(AppContext);
  let { chosenButton, chosenTab } = value.state;
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
    setCurrentItems(
      items.filter(
        (item) =>
          item.dashboardSectionId_FK === currentSections.dashboardSectionId
      )
    );
  }, [currentSections]);

  useEffect(() => {
    fetch("/api/session")
      .then((response) => response.json())
      .then((data) => {
        console.log("Session data:", data);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
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
      <div className={styles.container}>
        <Head>
          <title>EMAR Dashboards</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <div className={`${styles.sideNavContainer}`}>
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
              {currentItems.map((item, i) => (
                <Link href="/" className={styles.dashboardItem} key={i}>
                  <div className={styles.dashboardItem}>
                    <BiRightArrow />
                    {item.dashboardSectionItemsName}
                  </div>
                </Link>
              ))}
            </div>
            <div className={`${styles.right}`}>
              <div className={`${styles.quickLinkContainer}`}>
                <QuickLink
                  title="Search"
                  link="/"
                  image={search}
                  width="20%"
                  height="65%"
                />
                <QuickLink title="" link="/" width="20%" height="65%" />
                <QuickLink title="" link="/" width="20%" height="65%" />
              </div>
              <div className={`${styles.upcomingChangesContent} box`}></div>
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
  const items = dataJson.items;

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
