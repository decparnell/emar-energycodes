import AppContext from "../context/AppContext";
import { useContext } from "react";
import styles from "../../styles/header.module.css";

function TabNavbar() {
  const dashboards = [
    {
      dashboardId: 1,
      dashboardName: "Codes Schedules",
      dashboardColumns: 2,
      dashboardOrder: 1,
    },
    {
      dashboardId: 2,
      dashboardName: "Data Specification",
      dashboardColumns: 2,
      dashboardOrder: 2,
    },
  ];
  const value = useContext(AppContext);
  let { chosenTab } = value.state;

  const handleClick = (id, e) => {
    e.preventDefault();
    value.setChosenTab(id);
  };

  return (
    <div className={styles.tabHeader}>
      {dashboards.map((dash, i) =>
        dash.dashboardId == chosenTab ? (
          <div
            className={`${styles.tabItem} ${styles.chosenTab}`}
            key={i}
            onClick={(e) => handleClick(dash.dashboardId, e)}
          >
            {dash.dashboardName}
          </div>
        ) : (
          <div
            className={`${styles.tabItem}`}
            key={i}
            onClick={(e) => handleClick(dash.dashboardId, e)}
          >
            {dash.dashboardName}
          </div>
        )
      )}
    </div>
  );
}
export default TabNavbar;
