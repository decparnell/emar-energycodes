import styles from "../styles/home.module.css";
import Head from "next/head";
import Dashboard from "../components/dashboard";
import { useState, useEffect, useContext } from "react";
import AppContext from "../components/context/AppContext";
function HomePage({ dashboards, sections, items, latestVersionJson, latestNews }) {
  const value = useContext(AppContext);
  //princess add the var that you set the api results to in the brackets below
  value.setNewsItems(latestNews);


  const [currentDashboard, setCurrentDashboard] = useState(
    dashboards.filter((dashboard) => dashboard.dashboardOrder == 1)[0]
  );

  const [currentSections, setCurrentSections] = useState(
    sections.filter(
      (section) => section.dashboardId_FK == currentDashboard.dashboardId
    )
  );

  useEffect(() => {
    setCurrentSections(
      sections.filter(
        (section) => section.dashboardId_FK == currentDashboard.dashboardId
      )
    );
  }, [currentDashboard]);

  function onClickDashboard(dashboardName, e) {
    e.preventDefault();
    const newDashboard = dashboards.filter(
      (dashboard) => dashboard.dashboardName == dashboardName
    )[0];
    setCurrentDashboard(newDashboard);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>EMAR Dashboards</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={styles.dashboardSelector}>
        {dashboards.map((dash) =>
          dash.dashboardName == currentDashboard.dashboardName ? (
            <button
              onClick={(e) => onClickDashboard(dash.dashboardName, e)}
              className={`${styles.dashboardButton} ${styles.selectedDashboard}`}
            >
              <h4 className={styles.dashButtonTitle}>{dash.dashboardName}</h4>
            </button>
          ) : (
            <button
              onClick={(e) => onClickDashboard(dash.dashboardName, e)}
              className={styles.dashboardButton}
            >
              <h4 className={styles.dashButtonTitle}>{dash.dashboardName}</h4>
            </button>
          )
        )}
      </div>
      <Dashboard
        name={currentDashboard.dashboardName}
        columns={currentDashboard.dashboardColumns}
        sections={currentSections}
        items={items}
        versions={latestVersionJson}
      />
    </div>
  );
}

export default HomePage;

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-17.uksouth.logic.azure.com/workflows/0eddf883c64d48d0939b18549894fe2e/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qmkujig7GnFXCDXAXxVci2bH9VtUPMyyEwlyEibylvI`
  );
  const dataJson = await dataReq.json();
  const dashboards = dataJson.dashboards;
  const sections = dataJson.sections;
  const items = dataJson.items;

  const getLatestVersions = await fetch(
    `https://prod-02.uksouth.logic.azure.com:443/workflows/42c048e7e8dc41758ed35c02ff7b4de7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6P22c3SoD1TzE42D8fz1HCWKFo4u-l34pRvtnf2i47g`
  );
  const latestVersionJson = await getLatestVersions.json();

  const newsData = await fetch(
    'https://prod2-21.uksouth.logic.azure.com:443/workflows/3b40d5e4e24449e187511befe44b600b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ikzFKQ4CtAXK2-HMi8rjTZ5Is_ho1YnNGDCNg8t0HRk'
  );
  const latestNews = await newsData.json(); 

  // Pass data to the page via props
  return { props: { dashboards, sections, items, latestVersionJson, latestNews } };
}
