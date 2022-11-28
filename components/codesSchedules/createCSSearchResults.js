import styles from "../../styles/codesSchedulesSearch.module.css";
import { logMessage } from "../helperFunctions/logMessage";
import { CodesSchedulesSearchResults } from "./codesSchedulesSearchResults";

/**
 *  returns table with search results or error message
 */
function CreateCSSearchResults(searchResults, errorMessage, searchPhrase) {
  let tableHeader = "";
  let tableBody = "";

  // deduplicating search results and sorting them in descending order
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

  // if errorMessage is not set then create table header and body
  if (!errorMessage) {
    const codesSchedulesSearch = CodesSchedulesSearchResults(
      searchResults,
      searchPhrase
    );
    tableHeader = codesSchedulesSearch[0];
    tableBody = codesSchedulesSearch[1];
  }

  //  if searchResults array is not empty show table with the results otherwise show error message
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
        <div className={styles.errorMessage}>
          {logMessage(`No results found for "${searchPhrase}"`)}
        </div>
      )}
    </>
  );
}

export default CreateCSSearchResults;
