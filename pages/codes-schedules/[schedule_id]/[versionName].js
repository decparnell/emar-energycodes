import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../../styles/codes.module.css";
import CreateCustomTag from "../../../components/scheduleId/createCustomTag-scheduleId";
import CreateChangeTable from "../../../components/scheduleId/createChangeTable";
import { listItemsToIgnore, listHeaders } from "../../../components/settings";
import Head from "next/head";
import { checkIfVariablesAreAvailable } from "../../../components/helperFunctions/checkIfVariablesAreAvailable";
import { logError } from "../../../components/helperFunctions/logError";
import { checkIfItemsAvailableInArray } from "../../../components/helperFunctions/checkIfItemsAvailableInArray";
import DocumentDownload from "../../../components/documentDownload";
import LinkTextFromDefinitions from "../../../components/helperFunctions/linkTextFromDefinitions";
import Sidebar from "../../../components/sidebar";

function ScheduleDetail({
  versions,
  parts,
  sections,
  components,
  document,
  definitions,
  url,
  optionalityInfo,
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
  const docInfo = checkIfItemsAvailableInArray(internalErrorLog, "document")
    ? document[0]
    : null;
  const router = useRouter();
  const schedule_id = router.query.schedule_id;
  const versionName = router.query.versionName;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scheduleNumber = docInfo.scheduleNumber;
  const scheduleName = docInfo.documentName;

  // create data for mandatory table, X axis being parts, Y axis optionality owners.
  // structured as object with:
  // keys being optionality.ownersName
  // values being an array of optionality.optionalityNames (Mandatory, N/A)
  const transformTable = (optionalities, parts) => {
    let res = {};
    for (const el of optionalities) {
      // each optionality owner gets a key
      res[el.ownersName] = [];
      const ownersId = el.ownersId;
      for (const part of parts) {
        // find a match between optionalities and parts by ownersId and partId
        const value = optionalities.find(
          (el) => el.ownersId === ownersId && el.partId === part.partId
        );
        if (value !== undefined) {
          res[el.ownersName].push(value.optionalityName);
        }
      }
    }
    return res;
  };
  const mandatoryTable = transformTable(optionalityInfo, parts);

  return (
    <>
      <Head>
        <title>EMAR - {docInfo ? docInfo.documentName : null}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
        {checkIfItemsAvailableInArray(internalErrorLog, "sections") ? (
          <div className={styles.sidebarSectionsList}>
            {createSidebarContent(parts, sections)}
          </div>
        ) : (
          <div className={styles.errorBox}>{logError("Sections")}</div>
        )}
      </Sidebar>
      <div
        className={[
          isSidebarOpen
            ? styles.contentWithSidebar
            : styles.contentWithoutSidebar,
          styles.content,
        ].join(" ")}
      >
        {checkIfItemsAvailableInArray(internalErrorLog, "document") ? (
          <div className={styles.scheduleContainer}>
            <DocumentDownload type="schedule" url={url} />
            <h1 className={styles.contentTitle}>
              {scheduleNumber
                ? `${scheduleName} - Schedule ${scheduleNumber}`
                : scheduleName}
            </h1>
            {/* versions table */}
            {checkIfItemsAvailableInArray(internalErrorLog, "versions") ? (
              <div>
                <table id="version" className={styles.table}>
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Implementation Date</th>
                      <th>Reason</th>
                    </tr>
                  </thead>
                  {checkIfItemsAvailableInArray(
                    internalErrorLog,
                    "schedule_id"
                  ) &&
                  checkIfItemsAvailableInArray(
                    internalErrorLog,
                    "versionName"
                  ) ? (
                    <tbody>
                      {CreateChangeTable(versions, schedule_id, versionName)}
                    </tbody>
                  ) : null}
                </table>
                {/* if there is at least one optionality show a mandatory table */}
                {optionalityInfo[0].optionalityId && (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th></th>
                        {parts.map((el, i) => {
                          return <th key={el.partId}>{el.partName}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {/* as per transformTable data structure first column is a key (optionality.ownersName) 
                      and the rest of columns are value array  */}
                      {Object.keys(mandatoryTable).map((el) => {
                        return (
                          <tr key={el.partsOwnersOptionalityId}>
                            <td>{el}</td>
                            {mandatoryTable[el].map((item, i) => (
                              <td key={i}>{item}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <div className={styles.errorBox}>{logError("Versions")}</div>
            )}
            {checkIfItemsAvailableInArray(internalErrorLog, "parts") &&
            checkIfItemsAvailableInArray(internalErrorLog, "sections") &&
            checkIfItemsAvailableInArray(internalErrorLog, "components") &&
            checkIfItemsAvailableInArray(internalErrorLog, "definitions") ? (
              createContent(parts, sections, components, definitions)
            ) : (
              <div className={styles.errorBox}>{logError("Schedule")}</div>
            )}
          </div>
        ) : (
          <div className={styles.errorBox}>{logError("Document")}</div>
        )}
      </div>
    </>
  );
}

export default ScheduleDetail;

// content for sidebar
const createSidebarContent = (parts, sections) => {
  let content = [];

  for (const part of parts) {
    content.push(
      <h5 className={styles.sidebarPartName}>
        {/* partName (Main, Schedule 1 - Interpretations and Definitions etc) to be displayed in sidebar */}
        <a href={`#${part.partId}`}>{part.partName}</a>
      </h5>
    );
    let sectionsInPart = sections.filter((sec) => {
      return sec.partId_FK === part.partId;
    });

    for (const section of sectionsInPart) {
      content.push(
        <a href={`#sec${section.sectionId}`}>
          {/* sectionName - 1. Definitions and Interpretation, 2. Categories of Parties */}
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
  if (checkIfItemsAvailableInArray(internalErrorLog, "parts")) {
    for (const part of parts) {
      const linkedPartName = LinkTextFromDefinitions(
        part.partName,
        definitions
      );
      content.push(
        <h2 id={`${part.partId}`} className={styles.partName}>
          {linkedPartName}
        </h2>
      );
      if (checkIfItemsAvailableInArray(internalErrorLog, "sections")) {
        let sectionsInPart = sections.filter((sec) => {
          return sec.partId_FK === part.partId;
        });

        if (checkIfItemsAvailableInArray(internalErrorLog, "components")) {
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
                if (clause.clauseReference != "") {
                  clausesProcessed.push(clause.clauseReference);
                }

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
            const linkedSectionName = LinkTextFromDefinitions(
              section.sectionName,
              definitions
            );
            content.push(
              <div
                id={`sec${section.sectionId}`}
                key={section.sectionName}
                className={styles.section}
              >
                <h3>
                  ({section.sectionOrder}) {linkedSectionName}
                </h3>
                {componentsJsx}
              </div>
            );
          }
        } else {
          return (
            <div className={styles.errorBox}>{logError("Components")}</div>
          );
        }
      } else {
        return <div className={styles.errorBox}>{logError("Sections")}</div>;
      }
    }
  }
  if (checkIfItemsAvailableInArray(internalErrorLog, "parts")) {
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
    `https://prod-17.uksouth.logic.azure.com/workflows/77a0b5ad93b64061b09df91f2c31533c/triggers/manual/paths/invoke/documentId/${context.params.schedule_id}/version/${context.params.versionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BDD6aTd29eiNrUUfBH6cjUCM0puErQ5vJyjWzUKmKEI`
  );

  const dataJson = await dataReq.json();
  const parts = dataJson.parts;
  const sections = dataJson.sections;
  const components = dataJson.components;
  const versions = dataJson.versions;
  const document = dataJson.document;

  const definitionsReq = await fetch(
    `https://prod-28.uksouth.logic.azure.com:443/workflows/32adcb866eed49d998b350e43e4386ac/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=I3PFridsAI83LG9Df3hipu3Z4V4qgmj8VvJ0ijYrYz8`
  );
  const definitionsJson = await definitionsReq.json();
  let definitions = definitionsJson.definitions;
  const scheduleLinks = definitionsJson.scheduleLinks;
  const dataSpecLinks = definitionsJson.dataSpecLinks;
  definitions = definitions.concat(scheduleLinks).concat(dataSpecLinks);

  let urlFetch = await fetch(
    `https://prod-03.uksouth.logic.azure.com/workflows/076c8da5b74d452abc028069f5a1ac4e/triggers/manual/paths/invoke/searchValue/${document[0].documentName}/versionNumber/${context.params.versionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wywtlxVddPbnw_SwqTbYDKCPB_9rfU085Qb5IvDk0A4`
  );
  const urlJson = await urlFetch.json();
  const url = await urlJson.url;

  const optionalityReq = await fetch(
    `https://prod-14.uksouth.logic.azure.com/workflows/4f3b0f9b10f14137afd1fca0686b8119/triggers/manual/paths/invoke/documentId/${document[0].documentId}/versionId/${context.params.versionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lVJcdlsL4DY-LixBpllt8Ats8IO9LiJjpjs6FxZovjg`
  );
  const optionalityInfo = await optionalityReq.json();
  // Pass data to the page via props
  return {
    props: {
      versions,
      parts,
      sections,
      components,
      document,
      definitions,
      url,
      optionalityInfo,
    },
  };
}
