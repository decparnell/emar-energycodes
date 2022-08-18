// import styles from "../../styles/dataspec.module.css";
// import { getDistinctValuesMarketMessage } from "./functions/getDistinctValues";
// import { MarketMessageSearchResults } from "./marketMessageSearchResults";
// import { ScenarioVariantSearchResults } from "./scenarioVariantSearchResults";
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
      searchResults
      //   latestDataSpecVersion,
    );
    tableHeader = codesSchedulesSearch[0];
    tableBody = codesSchedulesSearch[1];
  }
  console.log("tableHeader", tableHeader);
  return (
    <div>
      <table>
        {tableHeader}
        {tableBody}
      </table>
    </div>
  );
}

export default CreateCSSearchResults;
