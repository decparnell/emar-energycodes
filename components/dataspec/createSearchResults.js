import styles from "../../styles/dataspec.module.css";
import { getDistinctValuesMarketMessage } from "./functions/getDistinctValues";
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
    const mmInfo = getDistinctValuesMarketMessage(searchResults);
    console.log(mmInfo);
    const mmSearch = MarketMessageSearchResults(mmInfo, latestDataSpecVersion);
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
    tableHeader = svSearch[0];
    tableBody = svSearch[1];
  }
  return (
    <div className={styles.contentContainer}>
      <table className={styles.fullWidthTable}>
        {tableHeader}
        {tableBody}
      </table>
    </div>
  );
}

export default CreateSearchResults;
