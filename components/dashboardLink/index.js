import Link from "next/link";
import styles from "../../styles/home.module.css";
import { BiRightArrow } from "react-icons/bi";

function DashboardLink(props) {
    //currentItems per each schedule sections
    const currentItems = props.currentItems;
    //latest versions for eact currentItems
    const versions = props.versions;


    return (
        currentItems.map((item, i) => {
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
                        <a
                            href={item.dashboardSectionItemsLink}
                            download={item.dashboardSectionItemsName}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.dashboardItem}
                        >
                            <BiRightArrow />
                            {item.dashboardSectionItemsName}
                        </a>
                    </div>
                ) : item.dashboardSectionItemsLinkType == "EXTERNAL" ? (
                    <div className={styles.dashboardItemsPanel} >
                        <a
                            href={item.dashboardSectionItemsLink}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.dashboardItem}
                        >
                            <BiRightArrow />
                            {item.dashboardSectionItemsName}
                        </a>
                    </div>
                ) : (
                    <div className={styles.dashboardItemsPanel} >
                        <a href={dashboardHref} className={styles.dashboardItem} key={i}>
                            <BiRightArrow />
                            {item.dashboardSectionItemsName}
                        </a>
                    </div>)
            )
        })
    );
}

export default DashboardLink;