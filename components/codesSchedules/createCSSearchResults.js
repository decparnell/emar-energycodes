import styles from "../../styles/codesSchedulesSearch.module.css";
import { CodesSchedulesSearchResults } from "./codesSchedulesSearchResults";
function CreateCSSearchResults(
  searchResults,
  errorMessage,
  latestScheduleVersion,
  searchPhrase,
  schedulesFilterValue,
  setSchedulesFilterValue,
  resetFilter
) {
  let tableHeader = "";
  let tableBody = "";

  if (errorMessage) {
  } else {
    const codesSchedulesSearch = CodesSchedulesSearchResults(
      searchResults,
      // latestScheduleVersion,
      searchPhrase
      // schedulesFilterValue,
      // setSchedulesFilterValue,
      // resetFilter
    );
    tableHeader = codesSchedulesSearch[0];
    tableBody = codesSchedulesSearch[1];
  }
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
