/* import Dropdown from "../../../components/dropdown";
import { useState } from "react";
import styles from "../../../styles/compare.module.css";
function Compare({ dataJson }) {
  //state for the document dropdown
  const [documentDropdownValue, setDropdownValue] = useState(
    "Please select a schedule to compare"
  );

  //state for the version1 dropdown
  const [leftVersionDropdownValue, setLeftVersionDropdownValue] = useState(
    "Please select the first version you want to compare"
  );

  //state for the version2 dropdown
  const [rightVersionDropdownValue, setRightVersionDropdownValue] = useState(
    "Please select the first version you want to compare"
  );

  //state for the link to the redlining doc
  const [redLiningDocLink, setRedLiningDocLink] = useState();

  //state for the search dropdown
  const [searchResults, setSearchResults] = useState();

  const documentOption = prepDocumentData(dataJson);
  const versionOption = prepVersionData(dataJson, documentDropdownValue);

  //create the search results from the criteria in the dropdowns
  const searchForChanges = () => {
    setSearchResults([
      {
        compnentId: "1.1",
        old: "SDES comprises of several services:",
        new: "The Secure Data Exchange Service (SDES) consists of several web-based services that enable Parties to securely exchange data. These services comprise:",
        reason: "R0101 Future Change Release",
      },
      {
        compnentId: "1.2",
        old: "(a) the Secure Data Exchange Portal which is described further in Section B;",
        new: "(a) the Secure Data Exchange Portal (SDEP) which is described further in Section B;",
        reason: "R0101 Future Change Release",
      },
      {
        compnentId: "4.2",
        old: "The Secure Data Exchange Service shall ensure the SDES service desk is available:",
        new: "The SDES shall ensure the SDES service desk is available:",
        reason: "R0102 Future Change Release",
      },
      {
        compnentId: "8.7",
        old: "(c) the attachment will be available for download. ",
        new: "(c) if it passes the virus check, the attachment will be available for download. ",
        reason: "R0103 Future Change Release",
      },
    ]);

    setRedLiningDocLink(
      "https://reccodocstroage.blob.core.windows.net/redlineddocs/SDES Service Definition v2.doc"
    );
  };
  return (
    <div className={styles.pageContainer}>
      <h1>Compare Schedule Versions</h1>
      <div className={styles.searchContainer}>
        <Dropdown
          style={styles.docSelector}
          options={documentOption}
          value={[documentDropdownValue, setDropdownValue]}
        />
        <div className={styles.versionContainer}>
          {documentDropdownValue != "Please select a schedule to compare" ? (
            <>
              <Dropdown
                style={`${styles.versionSelector} ${styles.leftSelector}`}
                options={versionOption.filter(function (e) {
                  return e !== rightVersionDropdownValue;
                })}
                value={[leftVersionDropdownValue, setLeftVersionDropdownValue]}
                excludeValues={rightVersionDropdownValue}
              />
              <Dropdown
                style={`${styles.versionSelector} ${styles.rightSelector}`}
                options={versionOption.filter(function (e) {
                  return e !== leftVersionDropdownValue;
                })}
                value={[
                  rightVersionDropdownValue,
                  setRightVersionDropdownValue,
                ]}
                excludeValues={leftVersionDropdownValue}
              />
              <button onClick={searchForChanges}>Find Differences</button>
            </>
          ) : null}
        </div>
      </div>
      {searchResults != null ? (
        <div className={styles.searchResults}>
          {createSearchResults(searchResults, redLiningDocLink)}
        </div>
      ) : null}
    </div>
  );
}

export default Compare;

function prepDocumentData(dataJson) {
  const docData = dataJson.filter((doc) => doc.documentType == "schedule");
  const docList = [];
  for (const doc in docData) {
    docList.push(docData[doc].documentName);
  }
  const uniqueDocList = [...new Set(docList)];
  return uniqueDocList;
}

function prepVersionData(dataJson, document) {
  const docData = dataJson.filter((doc) => doc.documentName == document);
  const docList = [];
  for (const doc in docData) {
    docList.push(docData[doc].versionName);
  }
  const uniqueDocList = [...new Set(docList)];
  return uniqueDocList;
}

function createSearchResults(results, redLiningDocLink) {
  const resArray = [];
  for (const result in results) {
    const res = results[result];
    resArray.push(
      <tr>
        <td>{res.compnentId}</td>
        <td>{res.old}</td>
        <td>{res.new}</td>
        <td>{res.reason}</td>
      </tr>
    );
  }
  return (
    <div className={styles.searchResults}>
      <table className={styles.resultsTable}>
        <th>Clause Reference</th>
        <th>Old Text</th>
        <th>New Text</th>
        <th>Change Reason</th>
        {resArray}
      </table>
      <button className={styles.downloadButton}>
        <a className={styles.downloadButton} href={redLiningDocLink} download>
          Download Redlined Document
        </a>
      </button>
    </div>
  );
}

export async function getStaticProps({ params }) {
  //return the info about the latest version
  const dataReq = await fetch(
    `https://prod-02.uksouth.logic.azure.com:443/workflows/42c048e7e8dc41758ed35c02ff7b4de7/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6P22c3SoD1TzE42D8fz1HCWKFo4u-l34pRvtnf2i47g`
  );
  const dataJson = await dataReq.json();

  return {
    props: { dataJson },
  };
}
 */
