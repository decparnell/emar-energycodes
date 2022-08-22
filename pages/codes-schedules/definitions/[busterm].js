import { useRouter } from "next/router";
import styles from "../../../styles/codes.module.css";
import Head from "next/head";
function definitions({ versions, parts, sections, components, document }) {
  const docInfo = document[0];
  const partInfo = parts[0];
  const componentInfo = components[0];

  return (
    <div className={styles.scheduleContainer}>
      <Head>
        <title>{docInfo.documentName} Definition</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <h1 className={styles.contentTitle}>{docInfo.documentName} Definition</h1>{" "}
      <h2>{partInfo.sectionName}</h2>
      <p className={styles.definitionText}>{componentInfo.componentText}</p>
    </div>
  );
}

export default definitions;

export async function getStaticPaths() {
  const data = await fetch(
    "https://prod-24.uksouth.logic.azure.com:443/workflows/79207991a2b342fb928f63dcd5cbbd96/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tC7JNi24oUQL4quKMQaZk2W10fSwt0Jb73gD0tljFqg"
  );
  const schedules = await data.json();
  return {
    paths: schedules.map((schedule) => {
      return {
        params: {
          busterm: String(schedule.documentId),
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //return the info about the latest version
  const dataReq = await fetch(
    `https://prod-24.uksouth.logic.azure.com/workflows/c33b5eaa44fa46e9937c34b52091467b/triggers/manual/paths/invoke/${params.busterm}/definition?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xtAmkWUamwr-8PSmPnraMtCqA6mgxiAXrCqqZPf06OI`
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
