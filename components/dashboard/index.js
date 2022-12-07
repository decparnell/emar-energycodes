import Link from "next/link";
import styles from "../../styles/dashboards.module.css";

function Dashboard(props) {
  //gets props.columns and put it in the columns variable
  const columns = props.columns;
  //gets props.sections and put it in the sections variable
  const sections = props.sections;
  //gets props.items and put it in the items variable
  const items = props.items;
  const containerStyle = `${styles.dashboardContainer} columns_${columns}`;
  //gets props.versions and put it in the versions variable
  const versions = props.versions;

  const sectionsJSX = [];

  function CreateSection(section) {
    const sectionItems = items
      // filter items based on the dashboardSectionId key
      .filter(
        (item) => item.dashboardSectionId_FK == section.dashboardSectionId
      )
      //sort the items(ascending)
      .sort(
        (firstItem, secondItem) =>
          firstItem.dashboardSectionItemsOrder -
          secondItem.dashboardSectionItemsOrder
      );
    //loops over every item in sectionItems 
    sectionItems.forEach((item, index) => {
      //checks for certain condition and if it was true sets the version name
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

        sectionItems[index].dashboardSectionItemsLink =
          "/codes-schedules/" +
          item.dashboardSectionItemsLink +
          `/${versionName}`;
      }
    });

    return (
      <div className={styles.container}>
        <h2 className={styles.sectionHeader}>{section.dashboardSectionName}</h2>
        <div className={styles.sectionContainer}>
          {sectionItems.map((item) => (
            <>
              {item.dashboardSectionItemsLinkType == "DOWNLOAD" ? (
                <a
                  className={styles.itemContainer}
                  href={item.dashboardSectionItemsLink}
                  download={item.dashboardSectionItemsName}
                >
                  {item.dashboardSectionItemsName}
                </a>
              ) : item.dashboardSectionItemsLinkType == "EXTERNAL" ? (
                <a
                  href={item.dashboardSectionItemsLink}
                  className={styles.itemContainer}
                >
                  {item.dashboardSectionItemsName}
                </a>
              ) : (
                <Link
                  key={item.dashboardSectionsItemsId}
                  href={{
                    pathname: `${item.dashboardSectionItemsLink}`
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
      </div>
    );
  }

  sections.forEach((item, index) => {
    sectionsJSX.push(CreateSection(item));
  });

  return <div className={containerStyle}>{sectionsJSX}</div>;
}

export default Dashboard;
