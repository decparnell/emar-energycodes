import Link from "next/link";
import styles from "../../styles/dashboards.module.css";

function Dashboard(props) {
  const dashboardName = props.name;
  const columns = props.columns;
  const sections = props.sections;
  const items = props.items;
  const containerStyle = `${styles.dashboardContainer} columns_${columns}`;
  const versions = props.versions;

  const sectionsJSX = [];

  function CreateSection(section) {
    const sectionItems = items
      .filter(
        (item) => item.dashboardSectionId_FK == section.dashboardSectionId
      )
      .sort(
        (firstItem, secondItem) =>
          firstItem.dashboardSectionItemsOrder -
          secondItem.dashboardSectionItemsOrder
      );
    sectionItems.forEach((item, index) => {
      if (
        item.dashboardSectionItemsLinkType == "SCHEDULE" &&
        item.dashboardSectionItemsLink.startsWith("/codes-schedules/") ==
          false &&
        item.dashboardSectionItemsLink != "FIX"
      ) {
        const versionName = versions.filter(
          (version) => version.documentId == item.dashboardSectionItemsLink
        )[0].versionName;

        sectionItems[index].dashboardSectionItemsLink =
          "/codes-schedules/" +
          item.dashboardSectionItemsLink +
          `/${versionName}`;
      }
    });

    return (
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionHeader}>{section.dashboardSectionName}</h2>
        {sectionItems.map((item) => (
          <>
            {item.dashboardSectionItemsLinkType == "DOWNLOAD" ? (
              <a
                href={item.dashboardSectionItemsLink}
                download={item.dashboardSectionItemsName}
              >
                {item.dashboardSectionItemsName}
              </a>
            ) : item.dashboardSectionItemsLinkType == "EXTERNAL" ? (
              <a href={item.dashboardSectionItemsLink}>
                {item.dashboardSectionItemsName}
              </a>
            ) : (
              <Link
                key={item.dashboardSectionsItemsId}
                href={{
                  pathname: `${item.dashboardSectionItemsLink}`,
                }}
                className={styles.itemContainer}
                passHref={true}
              >
                <div className={styles.itemContainer}>
                  {item.dashboardSectionItemsName}
                </div>
              </Link>
            )}

            <div className={styles.seperator}></div>
          </>
        ))}
      </div>
    );
  }

  sections.forEach((item, index) => {
    sectionsJSX.push(CreateSection(item));
  });

  return <div className={containerStyle}>{sectionsJSX}</div>;
}

export default Dashboard;
