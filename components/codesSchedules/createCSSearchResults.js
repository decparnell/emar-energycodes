import styles from "../../styles/codesSchedulesSearch.module.css";
import { logMessage } from "../helperFunctions/logMessage";
import { CodesSchedulesSearchResults } from "./codesSchedulesSearchResults";
function CreateCSSearchResults(searchResults, errorMessage, searchPhrase) {
  let tableHeader = "";
  let tableBody = "";

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
      {searchResults.length > 0 ? (
        <div className={styles.contentContainer}>
          <table className={styles.resultsTable}>
            {tableHeader}
            {tableBody}
          </table>
        </div>
      ) : (
        <div className={styles.messageBox}>
          {logMessage("There are no results for the term you have searched.")}
        </div>
      )}
    </>
  );
}

export default CreateCSSearchResults;
