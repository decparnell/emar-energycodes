import styles from "../../styles/releaseManagement.module.css";
import Head from "next/head";
import QuickLink from "../../components/helperFunctions/quickLink";

function ReleaseManagement({ recVersionAndChangesJSON }) {

  const apiResList = [
    { obj: recVersionAndChangesJSON, name: "recVersionAndChangesJSON" }
  ];

  const recVersion = recVersionAndChangesJSON.RecVersions;
  const changeProposal = recVersionAndChangesJSON.ChangeProposal;
  const changeInRecVersion = recVersionAndChangesJSON.ChangeInRecVersion;
  const changeAffectedSchedules = recVersionAndChangesJSON.ChangeAffectedSchedules;

  function filterByrecVersionsId(jsonData, field_name, id) {
    const filteredByIdData = jsonData.filter(obj => obj[field_name] === id)
    return filteredByIdData;
  }

  function mergeJSON(recVersion, changeProposal) {
    let mergedJSON = [];

    for (let i = 0; i < changeProposal.length; i++) {
      mergedJSON.push({
        ...recVersion[i],
        ...(changeProposal.find((innerItem) => innerItem.recVersionId_FK === recVersion[i].recVersionsId))
      });
    }
    return mergedJSON;
  }

  function mergeJSON2(recVersion, changeProposal) {
    const merged = recVersion.map(item => ({
      ...item,
      ...changeProposal.find(obj => obj.recVersionId_FK === item.recVersionsId)
    }));
    return merged;
  }



  //console.log(changeProposal)
  //console.log(mergeJSON2(changeProposal, recVersion).find(obj => obj.recVersionsId === 2))
  //const mgh = mergeJSON2(changeProposal, recVersion);

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
            <table className={styles.tableRM}>
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Status</th>
                  <th>Release Date</th>
                  <tr>
                    <th>Change Proposal Number</th>
                    <th>Change Proposal Name</th>
                  </tr>
                  <th>Affected REC Items</th>
                  <th>EMAR Version</th>
                  <th>Release </th>
                </tr>
              </thead>
              <tbody>
                {
                  recVersion.map((item, index) => {
                    const changeProposalFiltered = filterByrecVersionsId(changeProposal, "recVersionId_FK", item.recVersionsId);
                    let cpId = -1;
                    let arr;
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>{item.releaseDate}</td>
                        {changeProposalFiltered.length > 0 ?
                          changeProposalFiltered.map((itemCP) => {
                            cpId = itemCP.changeProposalId;
                            return (
                              <tr>
                                <td>{itemCP.number}</td>
                                <td>{itemCP.name}</td>
                              </tr>
                            )
                          }) :
                          <tr>
                            <td>{"N/A"}</td>
                            <td>{"N/A"}</td>
                          </tr>
                        }
                        <td>{"AFFECTED ITEMS"}</td>
                        <td>{item.emarVersion}</td>
                        <td><a href={item.linkToDetailedNotes}>{item.name} Release Notes</a></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
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
  const RecVersions = recVersionAndChangesJSON.ChangeProposal;

  return {
    props: {
      recVersionAndChangesJSON
    }
  };
}