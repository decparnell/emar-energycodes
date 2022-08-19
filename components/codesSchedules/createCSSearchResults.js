import styles from "../../styles/codesSchedulesSearch.module.css";
import { CodesSchedulesSearchResults } from "./codesSchedulesSearchResults";
function CreateCSSearchResults(
  searchResults,
  errorMessage,
  latestDataSpecVersion
) {
  let tableHeader = "";
  let tableBody = "";

  if (errorMessage) {
  } else {
    const codesSchedulesSearch = CodesSchedulesSearchResults(
      searchResults,
      latestDataSpecVersion
    );
    tableHeader = codesSchedulesSearch[0];
    tableBody = codesSchedulesSearch[1];
  }
  console.log("tableHeader", tableHeader);
  return (
    <div className={styles.contentContainer}>
      <table className={styles.resultsTable}>
        {tableHeader}
        {tableBody}
      </table>
    </div>
  );
}

export default CreateCSSearchResults;
