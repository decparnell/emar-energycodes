import styles from "../../styles/releaseManagement.module.css";
import Head from "next/head";
import QuickLink from "../../components/helperFunctions/quickLink";
import React from 'react';

function ReleaseManagement({ recVersionAndChangesJSON }) {

  const apiResList = [
    { obj: recVersionAndChangesJSON, name: "recVersionAndChangesJSON" }
  ];

  //JSON objects
  const recVersion = recVersionAndChangesJSON.RecVersions;
  const changeProposal = recVersionAndChangesJSON.ChangeProposal;
  const changeInRecVersion = recVersionAndChangesJSON.ChangeInRecVersion;
  const changeAffectedSchedules = recVersionAndChangesJSON.ChangeAffectedSchedules;

  //merge for changeProposal and changeAffectedSchedules
  const mergedChanges = changeProposal.map((changeProposal) => {
    const changeAffected = filterByFieldId(changeAffectedSchedules, "changeProposalId_FK", changeProposal.changeProposalId)
    return ({ ...changeProposal, changeAffectedLength: changeAffected.length, changeAffected })
  });

  //merge recVersion with mergedChanges(changeProposal and changeAffectedSchedules)
  const releaseManagementTable = recVersion.map((recVer) => {
    const changeProposal = filterByFieldId(mergedChanges, "recVersionId_FK", recVer.recVersionsId)
    const sumChangeAffected = changeProposal.map((cp) => {
      let sumChangeAffected = 0
      sumChangeAffected = sumChangeAffected + cp.changeAffectedLength
      return (sumChangeAffected)
    })

    return ({ ...recVer, changeProposalLength: changeProposal.length, changeProposal, sumChangeAffected: sumChangeAffected.reduce((sum, value) => sum = sum + value, 0) })
  })

  //Filter JSON object by specific field and id
  function filterByFieldId(jsonData, field_name, id) {
    return jsonData.filter(obj => obj[field_name] === id)
  }

  const firstBlock = (tableData, index) => {

    const fbChangeProposal = tableData.changeProposal[0]
    return (
      <tr>
        <td rowSpan={tableData.sumChangeAffected}>{tableData.name}</td>
        <td rowSpan={tableData.sumChangeAffected}>{tableData.status}</td>
        <td rowSpan={tableData.sumChangeAffected}>{new Date(tableData.releaseDate).toLocaleDateString("en-GB")}</td>
        <td>{fbChangeProposal?.number}</td>
        <td>{fbChangeProposal?.name + "\n" + fbChangeProposal?.changeAffectedLength}</td>
        {fbChangeProposal?.changeAffected.map((changeAffected) => (
          <tr><td>{changeAffected.affectedRecItems}</td></tr>
        ))}
        {/* index === 0 && <td>{"first row"}</td> */}
        <td>{"recVersion.emarVersion"}</td>
        <td>{"recVersion.release"}</td>
      </tr>
    )
  }


  const firstBlock2 = (tableData, index) => {
    return (
      tableData.changeProposal.map((changeProp, indx) => {
        return (
          <tr>
            <td>{tableData.name}</td>
            <td>{tableData.status}</td>
            <td>{new Date(tableData.releaseDate).toLocaleDateString("en-GB")}</td>
            <td>{changeProp?.number}</td>
            <td>{changeProp?.name + "\n" + changeProp?.changeAffectedLength}</td>
            {changeProp.changeAffected.map((changeAffected) => (
              <tr><td>{changeAffected.affectedRecItems}</td></tr>
            ))}
            {/* index === 0 && <td>{"first row"}</td> */}
            <td>{tableData.emarVersion}</td>
            <td><a href={tableData.linkToDetailedNotes} target="_blank" rel="noreferrer">{recVersion.name} Release Notes</a></td>
          </tr>
        )
      })
    )
  }

  const secondBlock = (tableData, index) => {
    console.log("Secondo", tableData)
    return (
      <>
      <tr>
        <td rowSpan={tableData.sumChangeAffected}>{tableData.name}</td>
        <td rowSpan={tableData.sumChangeAffected}>{tableData.status}</td>
        <td rowSpan={tableData.sumChangeAffected}>{new Date(tableData.releaseDate).toLocaleDateString("en-GB")}</td>
      </tr>
        {tableData.changeProposal.map((changeProp, indx) => {
          return (
            <tr>
              <td>{changeProp?.number}</td>
              <td>{changeProp?.name}</td>
              {changeProp.changeAffectedLength === 0 && <td>{"N/A"}</td>}
              {changeProp.changeAffected.map((changeAffected, ind) => (
                indx >= 0 && <tr><td>{changeAffected.affectedRecItems}</td></tr>
              ))}
              {indx === 0 && <td rowSpan={tableData.sumChangeAffected}>{tableData.emarVersion}</td>}
              {indx === 0 && <td rowSpan={tableData.sumChangeAffected}><a href={tableData.linkToDetailedNotes} target="_blank" rel="noreferrer">{recVersion.name} Release Notes</a></td>}
            </tr>
          )
        })}
        
      </>
    )
  }

  



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
                  <th>Change Proposal Number</th>
                  <th>Change Proposal Name</th>
                  <th>Affected REC Items</th>
                  <th>EMAR Version</th>
                  <th>Release</th>
                </tr>
              </thead>
              <tbody>
                {
                  releaseManagementTable.map((tableData, index) => {
                    //const changeProposalFiltered = filterByFieldId(mergedChanges, "recVersionId_FK", recVersion.recVersionsId);
                    return (
                      <>
                      <tr>
                        <td rowSpan={tableData.sumChangeAffected}>{tableData.name}</td>
                        <td rowSpan={tableData.sumChangeAffected}>{tableData.status}</td>
                        <td rowSpan={tableData.sumChangeAffected}>{new Date(tableData.releaseDate).toLocaleDateString("en-GB")}</td>
                      </tr>
                        {tableData.changeProposal.map((changeProp, indx) => {
                          return (
                            <tr>
                              <td>{changeProp?.number}</td>
                              <td>{changeProp?.name}</td>
                              {changeProp.changeAffectedLength === 0 && <td>{"N/A"}</td>}
                              {changeProp.changeAffected.map((changeAffected, ind) => (
                                indx >= 0 && <tr><td>{changeAffected.affectedRecItems}</td></tr>
                              ))}
                              {indx === 0 && <td rowSpan={tableData.sumChangeAffected}>{tableData.emarVersion}</td>}
                              {indx === 0 && <td rowSpan={tableData.sumChangeAffected}><a href={tableData.linkToDetailedNotes} target="_blank" rel="noreferrer">{recVersion.name} Release Notes</a></td>}
                            </tr>
                          )
                        })}
                        
                      </>
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