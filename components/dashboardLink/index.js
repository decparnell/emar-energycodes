import styles from "../../styles/home.module.css";
import { CustomBoxLink } from "../customComponents/customBoxLink";

function DashboardLink(props) {
    //currentItems per each schedule sections
    const currentItems = props.currentItems;
    //latest versions for eact currentItems
    const versions = props.versions;

    return (
        currentItems.map((item, id) => {
            let dashboardHref = "/";
            if (
                item.dashboardSectionItemsLinkType == "SCHEDULE" &&
                item.dashboardSectionItemsLink.startsWith("/codes-schedules/") ==
                false &&
                item.dashboardSectionItemsLink != "FIX"
            ) {
                const versionNames = versions.filter(
                    (version) => version.documentId == item.dashboardSectionItemsLink
                );
                const versionName = versionNames[versionNames.length - 1].versionName;

                dashboardHref = "/codes-schedules/" + item.dashboardSectionItemsLink + `/${versionName}`;
            }

            return (
                item.dashboardSectionItemsLinkType == "DOWNLOAD" ? (
                    <div className={styles.dashboardItemsPanel} >
                        <CustomBoxLink
                            href={item.dashboardSectionItemsLink}
                            key={id}
                            target="_blank"
                            rel="noreferrer"
                            download={item.dashboardSectionItemsName}
                        >
                            {item.dashboardSectionItemsName}
                        </CustomBoxLink>
                    </div>
                ) : item.dashboardSectionItemsLinkType == "EXTERNAL" ? (
                    <div className={styles.dashboardItemsPanel} >
                        <CustomBoxLink
                            href={item.dashboardSectionItemsLink}
                            key={id}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {item.dashboardSectionItemsName}
                        </CustomBoxLink>
                        
                    </div>
                ) : (
                    <div className={styles.dashboardItemsPanel} >
                        <CustomBoxLink
                            href={dashboardHref}
                            key={id}
                        >
                            {item.dashboardSectionItemsName}
                        </CustomBoxLink>
                    </div>)
            )
        })
    );
}

export default DashboardLink;