import styles from "../../styles/codesSchedulesSearch.module.css";
import { logMessage } from "../helperFunctions/logMessage";
import { CodesSchedulesSearchResults } from "./codesSchedulesSearchResults";
function CreateCSSearchResults(searchResults, errorMessage, searchPhrase) {
  let tableHeader = "";
  let tableBody = "";

  searchResults = searchResults
    .filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.versionName === value.versionName &&
            t.documentName === value.documentName &&
            t.clauseReference === value.clauseReference &&
            t.componentText === value.componentText
        )
    )
    .sort();
  if (errorMessage) {
  } else {
    const codesSchedulesSearch = CodesSchedulesSearchResults(
      searchResults,
      searchPhrase
    );
    tableHeader = codesSchedulesSearch[0];
    tableBody = codesSchedulesSearch[1];
  }

  return (
    <>
      <div className={styles.contentContainer}>
        <table className={styles.resultsTable}>
          {tableHeader}
          {tableBody}
        </table>
      </div>
    </>
  );
}

export default CreateCSSearchResults;
