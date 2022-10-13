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

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  const dataReq = await fetch(
    `https://prod-24.uksouth.logic.azure.com/workflows/5193606ca45540798cf35eb8212216cc/triggers/manual/paths/invoke/documentId/${context.params.busterm}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_YdM-1PPPblaVqP28pTc5rJQ0vrJDHcel3ZBFQjQwik`
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
