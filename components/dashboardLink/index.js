import styles from "../../styles/home.module.css";
import { CustomBoxLink } from "../customComponents/customBoxLink";
import AppContext from "../context/AppContext";
import { useContext } from "react";

function DashboardLink(props) {
  const value = useContext(AppContext);
  let { currentVersionMapping } = value.state;

  //currentItems per each schedule sections
  const currentItems = props.currentItems;
  //latest versions for eact currentItems
  const versions = currentVersionMapping;
  return currentItems.map((item, id) => {
    let dashboardHref = "/";
    if (
      item.dashboardSectionItemsLinkType == "SCHEDULE" &&
      item.dashboardSectionItemsLink.startsWith("/codes-schedules/") == false &&
      item.dashboardSectionItemsLink != "FIX"
    ) {
      const versionNames = versions.filter(
        (version) => version.documentId == item.dashboardSectionItemsLink
      );

      const versionName = versionNames[versionNames.length - 1].docVersionName;

      dashboardHref =
        "/codes-schedules/" +
        item.dashboardSectionItemsLink +
        `/${versionName}`;
    }

    return item.dashboardSectionItemsLinkType == "DOWNLOAD" ? (
      <div className={styles.dashboardItemsPanel}>
        <CustomBoxLink
          href={item.dashboardSectionItemsLink}
          id={`dashboardLink_${id}`}
          target="_blank"
          rel="noreferrer"
          download={item.dashboardSectionItemsName}
        >
          {item.dashboardSectionItemsName}
        </CustomBoxLink>
      </div>
    ) : item.dashboardSectionItemsLinkType == "EXTERNAL" ? (
      <div className={styles.dashboardItemsPanel}>
        <CustomBoxLink
          href={item.dashboardSectionItemsLink}
          id={`dashboardLink_${id}`}
          target="_blank"
          rel="noreferrer"
        >
          {item.dashboardSectionItemsName}
        </CustomBoxLink>
      </div>
    ) : (
      <div className={styles.dashboardItemsPanel}>
        <CustomBoxLink href={dashboardHref} id={`dashboardLink_${id}`}>
          {item.dashboardSectionItemsName}
        </CustomBoxLink>
      </div>
    );
  });
}

export default DashboardLink;
