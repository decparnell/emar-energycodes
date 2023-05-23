import styles from "../../styles/releaseManagement.module.css";
import Head from "next/head";
import QuickLink from "../../components/helperFunctions/quickLink";
import React from "react";
import ReleaseTable from "../../components/releaseTable";
function ReleaseManagement({ recVersionAndChangesJSON }) {
  const apiResList = [
    { obj: recVersionAndChangesJSON, name: "recVersionAndChangesJSON" },
  ];

  //JSON objects
  const recVersions = recVersionAndChangesJSON.RecVersions;
  const changeProposals = recVersionAndChangesJSON.ChangeProposal;
  const changeInRecVersion = recVersionAndChangesJSON.ChangeInRecVersion;
  const changeAffectedSchedules =
    recVersionAndChangesJSON.ChangeAffectedSchedules;

  return (
    <>
      <Head>
        <title>Release Management</title>
        <meta property="og:title" content="Release Management" key="title" />
      </Head>
      <div className={`${styles.container}`}>
        <div className={`${styles.mainContentContainer}`}>
          <div className={styles.top}>
            <div className={`${styles.quickLinkContainer}`}>
              <QuickLink title="Test1" link="/" height="100%" width="8vw" />
              <QuickLink title="Test2" link="/" height="100%" width="8vw" />
              <QuickLink title="Test3" link="/" height="100%" width="8vw" />
              <QuickLink title="Test4" link="/" height="100%" width="8vw" />
            </div>
          </div>

          <div className={`${styles.quickLinkContainer2}`}>
            <QuickLink title="Test5" link="/" height="100%" width="25vw" />
            <QuickLink title="Test6" link="/" height="100%" width="25vw" />
          </div>
        </div>
        <div className={`${styles.mainContentContainer}`}>
          <div className={`${styles.tableContainer}`}>
            {
              <ReleaseTable
                versions={recVersions}
                changes={changeProposals}
                affected={changeAffectedSchedules}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default ReleaseManagement;

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20000, stale-while-revalidate=59"
  );

  const getRecVersionsAndChanges = await fetch(
    "https://prod-07.uksouth.logic.azure.com/workflows/8920bdcc74c94f6fa6a7b157b83f933a/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=Bz5tW3QlJj53K4zrqYFw3h6cPg8-A62iRqIN_Q9ktWY"
  );
  const recVersionAndChangesJSON = await getRecVersionsAndChanges.json();

  return {
    props: {
      recVersionAndChangesJSON,
    },
  };
}
