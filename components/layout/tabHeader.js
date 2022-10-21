import AppContext from "../context/AppContext";
import { useContext } from "react";
import styles from "../../styles/header.module.css";
import { dashboards } from "../settings";
function TabNavbar() {
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
