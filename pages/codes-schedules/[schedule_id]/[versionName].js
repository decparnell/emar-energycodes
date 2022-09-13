import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/codes.module.css";
import CreateCustomTag from "../../../components/scheduleId/createCustomTag-scheduleId";
import CreateChangeTable from "../../../components/scheduleId/createChangeTable";
import { listItemsToIgnore, listHeaders } from "../../../components/settings";
import Head from "next/head";
import { checkIfVariablesAreAvailable } from "../../../components/helperFunctions/checkIfVariablesAreAvailable";
import { logError } from "../../../components/helperFunctions/logError";

function ScheduleDetail({
  versions,
  parts,
  sections,
  components,
  document,
  definitions,
}) {
  const apiVarList = [
    { obj: versions, name: "versions" },
    { obj: parts, name: "parts" },
    { obj: sections, name: "sections" },
    { obj: components, name: "components" },
    { obj: document, name: "document" },
    { obj: definitions, name: "definitions" },
  ];
  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);
  const docInfo =
    internalErrorLog.indexOf("document") === -1 ? document[0] : null;
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
        <Head>
          <title>EMAR - {docInfo ? docInfo.documentName : null}</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        {internalErrorLog.indexOf("sections") === -1 ? (
          <div className={styles.sidebarSectionsList}>
            {createSidebarContent(parts, sections)}
          </div>
        ) : (
          <div className={styles.errorBox}>
            {logError("Sections", "is not available")}
          </div>
        )}
      </aside>
      <div
        className={[
          isSidebarOpen
            ? styles.contentWithSidebar
            : styles.contentWithoutSidebar,
          styles.content,
        ].join(" ")}
      >
        {internalErrorLog.indexOf("document") === -1 ? (
          <div className={styles.scheduleContainer}>
            <h1 className={styles.contentTitle}>{docInfo.documentName}</h1>
            {internalErrorLog.indexOf("versions") === -1 ? (
              <table id="version" className={styles.table}>
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Implementation Date</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                {internalErrorLog.indexOf("schedule_id") === -1 &&
                  internalErrorLog.indexOf("versionName") === -1}
                {internalErrorLog.lastIndexOf() ? (
                  <tbody>
                    {CreateChangeTable(versions, schedule_id, versionName)}
                  </tbody>
                ) : null}
              </table>
            ) : (
              <div className={styles.errorBox}>
                {logError("Versions", "is not available")}
              </div>
            )}

            {internalErrorLog.indexOf("sparts") === -1 &&
            internalErrorLog.indexOf("sections") === -1 &&
            internalErrorLog.indexOf("components") === -1 &&
            internalErrorLog.indexOf("definitions") === -1 ? (
              createContent(parts, sections, components, definitions)
            ) : (
              <div className={styles.errorBox}>
                {logError("Item", "is not available")}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.errorBox}>
            {logError("Document", "is not available")}
          </div>
        )}
      </div>
    </>
  );
}

export default ScheduleDetail;

const createSidebarContent = (parts, sections) => {
  let content = [];

  for (const part of parts) {
    content.push(
      <h5 className={styles.sidebarPartName}>
        <a>{part.partName}</a>
      </h5>
    );
    let sectionsInPart = sections.filter((sec) => {
      return sec.partId_FK === part.partId;
    });

    for (const section of sectionsInPart) {
      content.push(
        <a key={section.sectionId} href={`#${section.sectionId}`}>
          {section.sectionOrder}. {section.sectionName}
        </a>
      );
    }
  }

  return <div>{content}</div>;
};

function createContent(parts, sections, components, definitions) {
  const apiVarList = [
    { obj: parts, name: "parts" },
    { obj: sections, name: "sections" },
    { obj: components, name: "components" },
    { obj: definitions, name: "definitions" },
  ];
  const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

  let content = [];
  if (internalErrorLog.indexOf("parts") === -1) {
    for (const part of parts) {
      content.push(<h2 className={styles.partName}>{part.partName}</h2>);
      if (internalErrorLog.indexOf("sections") === -1) {
        let sectionsInPart = sections.filter((sec) => {
          return sec.partId_FK === part.partId;
        });
        if (internalErrorLog.indexOf("components") === -1) {
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
        } else {
          return (
            <div className={styles.errorBox}>
              {logError("Components", "is not available")}
            </div>
          );
        }
      } else {
        return (
          <div className={styles.errorBox}>
            {logError("Sections", "is not available")}
          </div>
        );
      }
    }
  }
  if (internalErrorLog.indexOf("parts") === -1) {
    return <div className={styles.scheduleContentContainer}>{content}</div>;
  } else {
    return (
      <div className={styles.errorBox}>
        {logError("Parts", "is not available")}
      </div>
    );
  }
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
