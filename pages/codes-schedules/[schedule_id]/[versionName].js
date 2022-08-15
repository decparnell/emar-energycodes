import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/codes.module.css";
import CreateCustomTag from "../../../components/scheduleId/createCustomTag-scheduleId";
import CreateChangeTable from "../../../components/scheduleId/createChangeTable";
import { listItemsToIgnore, listHeaders } from "../../../components/settings";

function ScheduleDetail({
  versions,
  parts,
  sections,
  components,
  document,
  definitions,
}) {
  const docInfo = document[0];
  const router = useRouter();
  const schedule_id = router.query.schedule_id;
  const versionName = router.query.versionName;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <aside
        className={[
          isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed,
          styles.sidebar,
        ].join(" ")}
      >
        <div className={styles.hamburger}>
          <div
            className={[isSidebarOpen ? styles.open : null, styles.burger].join(
              " "
            )}
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={styles.sidebarSectionsList}>
          {sections.map((section) => {
            return (
              <a key={section.sectionId} href={`#${section.sectionId}`}>
                {section.sectionOrder}. {section.sectionName}
              </a>
            );
          })}
        </div>
      </aside>
      <div
        className={[
          isSidebarOpen
            ? styles.contentWithSidebar
            : styles.contentWithoutSidebar,
          styles.content,
        ].join(" ")}
      >
        <div className={styles.scheduleContainer}>
          <h1 className={styles.contentTitle}>{docInfo.documentName}</h1>
        </div>

        <table id="version" className={styles.table}>
          <th>Version</th>
          <th>Implementation Date</th>
          <th>Reason</th>
          <tbody>{CreateChangeTable(versions, schedule_id, versionName)}</tbody>
        </table>

        {createContent(parts, sections, components, definitions)}
      </div>
    </>
  );
}

export default ScheduleDetail;

function createContent(parts, sections, components, definitions) {
  let content = [];

  for (const part of parts) {
    content.push(<h2 className={styles.partName}>{part.partName}</h2>);
    let sectionsInPart = sections.filter((sec) => {
      return sec.partId_FK === part.partId;
    });
    for (const section of sectionsInPart) {
      let componentsInSection = components.filter(function (el2) {
        return el2.sectionId_FK === section.sectionId;
      });
      const clauses = componentsInSection.filter(function (el2) {
        return listItemsToIgnore.indexOf(el2.componentType) == -1;
      });
      const componentsJsx = [];
      const clausesProcessed = [];
      for (const clauseI in clauses) {
        const clause = clauses[clauseI];
        if (clausesProcessed.indexOf(clause.clauseReference) == -1) {
          clausesProcessed.push(clause.clauseReference);
          let clauseComponents = [];
          if (clause.componentType == "title") {
            clauseComponents.push(clause);
          } else {
            clauseComponents = componentsInSection.filter(function (el2) {
              return el2.clauseReference === clause.clauseReference;
            });
          }
          componentsJsx.push(
            CreateCustomTag(
              clause.clauseReference,
              clauseComponents,
              definitions
            )
          );
        }
      }
      content.push(
        <div
          id={section.sectionId}
          key={section.sectionName}
          className={styles.section}
        >
          <h3>
            ({section.sectionOrder}) {section.sectionName}
          </h3>
          {componentsJsx}
        </div>
      );
    }
  }
  return <div className={styles.scheduleContentContainer}>{content}</div>;
}

// This gets called on every request
export async function getServerSideProps(context) {
  //return the info about the latest version
  const dataReq = await fetch(
    `https://prod-24.uksouth.logic.azure.com/workflows/c33b5eaa44fa46e9937c34b52091467b/triggers/manual/paths/invoke/${context.params.schedule_id}/${context.params.versionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xtAmkWUamwr-8PSmPnraMtCqA6mgxiAXrCqqZPf06OI`
  );
  const dataJson = await dataReq.json();
  const parts = dataJson.parts;
  const sections = dataJson.sections;
  const components = dataJson.components;
  const versions = dataJson.versions;
  const document = dataJson.document;

  const definitionsReq = await fetch(
    `https://prod-27.uksouth.logic.azure.com:443/workflows/ba14c0c80fa447f99dd47e6c861c3ffd/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=w7CExwLA7utrpv2MTCbiIN9YYsAkH6op-PGZLxfy0bA`
  );
  const definitionsJson = await definitionsReq.json();
  const definitions = definitionsJson.definitions;
  return {
    props: { versions, parts, sections, components, document, definitions },
  };
}
