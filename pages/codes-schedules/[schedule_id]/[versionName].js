import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../styles/codes.module.css";
import CreateCustomTag from "../../../components/scheduleId/createCustomTag-scheduleId";
//import CreateCustomTag from "../../components/scheduleId/deleteMe";
import CreateChangeTable from "../../../components/scheduleId/createChangeTable";
import ScheduleHeader from "../../../components/scheduleId/scheduleHeader";
function ScheduleDetail({ versions, parts, sections, components, document }) {
  const docInfo = document[0];
  const router = useRouter();
  const schedule_id = router.query.schedule_id;
  const versionName = router.query.versionName;

  return (
    <>
      <div className={styles.scheduleContainer}>
        <h1 className={styles.contentTitle}>{docInfo.documentName}</h1>
      </div>

      <table id="version">
        <th>Version</th>
        <th>Implementation Date</th>
        <th>Reason</th>
        <tbody>{CreateChangeTable(versions, schedule_id, versionName)}</tbody>
      </table>

      {createContent(parts, sections, components)}
    </>
  );
}

export default ScheduleDetail;

function createContent(parts, sections, components) {
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
      const componentsJsx = componentsInSection.map((component) =>
        CreateCustomTag(
          component.componentText,
          component.componentType,
          section.sectionOrder,
          component.componentOrder,
          component.componentId,
          component.indent,
          component.clauseReference
        )
      );
      content.push(
        <div key={section.sectionName} className={styles.section}>
          <h2>
            ({section.sectionOrder}) {section.sectionName}
          </h2>
          {componentsJsx}
        </div>
      );
    }
  }
  return <div className={styles.scheduleContentContainer}>{content}</div>;
}

export async function getStaticPaths() {
  const data = await fetch(
    "https://prod-02.uksouth.logic.azure.com:443/workflows/42c048e7e8dc41758ed35c02ff7b4de7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6P22c3SoD1TzE42D8fz1HCWKFo4u-l34pRvtnf2i47g"
  );
  const schedules = await data.json();
  return {
    paths: schedules.map((schedule) => {
      return {
        params: {
          schedule_id: String(schedule.documentId),
          versionName: String(schedule.versionName),
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //return the info about the latest version
  const dataReq = await fetch(
    `https://prod-24.uksouth.logic.azure.com/workflows/c33b5eaa44fa46e9937c34b52091467b/triggers/manual/paths/invoke/${params.schedule_id}/${params.versionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xtAmkWUamwr-8PSmPnraMtCqA6mgxiAXrCqqZPf06OI`
  );
  const dataJson = await dataReq.json();
  const parts = dataJson.parts;
  const sections = dataJson.sections;
  const components = dataJson.components;
  const versions = dataJson.versions;
  const document = dataJson.document;
  return {
    props: { versions, parts, sections, components, document },
  };
}
