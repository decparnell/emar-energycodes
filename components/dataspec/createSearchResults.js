import styles from "../../styles/dataspec.module.css";
import removeNullValues from "./functions/removeNulls";
import Link from "next/link";
import { MarketMessageSearchResults } from "./marketMessageSearchResults";
import { ScenarioVariantSearchResults } from "./scenarioVariantSearchResults";
import { DataItemSearchResults } from "./DataItemSearchResults";
function CreateSearchResults(
  searchResults,
  searchType,
  errorMessage,
  sourceFilterValue,
  setSourceFilterValue,
  targetFilterValue,
  setTargetFilterValue,
  latestDataSpecVersion,
  resetFilter
) {
  let tableFilters = "";
  let tableHeader = "";
  let tableBody = "";

  if (errorMessage) {
  } else if (searchType == "mm") {
    const mmSearch = MarketMessageSearchResults(
      searchResults,
      latestDataSpecVersion
    );
    tableHeader = mmSearch[0];
    tableBody = mmSearch[1];
  } else if (searchType == "di") {
    const diSearch = DataItemSearchResults(
      searchResults,
      latestDataSpecVersion
    );
    tableHeader = diSearch[0];
    tableBody = diSearch[1];
  } else {
    const svSearch = ScenarioVariantSearchResults(
      searchResults,
      latestDataSpecVersion,
      sourceFilterValue,
      setSourceFilterValue,
      targetFilterValue,
      setTargetFilterValue,
      resetFilter
    );
    tableFilters = svSearch[0];
    tableHeader = svSearch[1];
    tableBody = svSearch[2];
  }
  return (
    <div className={styles.contentContainer}>
      {tableFilters}
      <table className={styles.fullWidthTable}>
        {tableHeader}
        {tableBody}
      </table>
    </div>
  );
}

export default CreateSearchResults;
