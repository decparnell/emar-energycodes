import styles from "../../styles/dataspec.module.css";
import removeNullValues from "./functions/removeNulls";
import Link from "next/link";
import Dropdown from "../dropdown";
import {
  getDistinctValuesSource,
  getDistinctValuesTarget,
} from "./functions/getDistinctValues";

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
    tableHeader = (
      <thead>
        <th>Market Message Reference</th>
        <th>Local Catalogue Reference</th>
        <th>Market Message Name</th>
      </thead>
    );

    tableBody = (
      <tbody>
        {searchResults.map((entry) => (
          <Link
            key={entry.EnergyMarketMessageIdentifier}
            href={{
              pathname: `/dataspec/${latestDataSpecVersion}/marketmessage/[mmid]`,
              query: {
                mmid: entry.EnergyMarketMessageIdentifier,
              },
            }}
            passHref={true}
          >
            <tr
              key={entry.EnergyMarketMessageIdentifier}
              className={`${styles.searchResultsRow} pointer`} 
            >
              <td>{entry.EnergyMarketMessageIdentifier}</td>
              <td>
                {removeNullValues(entry.DTCDcode) +
                  removeNullValues(entry.CSSMessageIdentifier) +
                  removeNullValues(entry.LegacyRGMAMessageIdentifier) +
                  removeNullValues(entry.LegacySPAAMessageIdentifier) +
                  removeNullValues(entry.UNCMessageIdentifier)}
              </td>
              <td>{entry.Label}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    );
  } else if (searchType == "di") {
    tableHeader = (
      <thead>
        <th>Data Item Reference</th>
        <th>Local Catalogue Reference</th>
        <th>Data Item Name</th>
      </thead>
    );

    tableBody = (
      <tbody>
        {searchResults.map((entry) => (
          <Link
            key={entry.DataItemIdentifier}
            href={{
              pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[dataItemId]`,
              query: {
                dataItemId: entry.DataItemIdentifier,
              },
            }}
            passHref={true}
          >
            <tr
              key={entry.DataItemIdentifier}
              className={`${styles.searchResultsRow} pointer`}
            >
              <td>{entry.DataItemIdentifier}</td>
              <td>
                {removeNullValues(entry.DTCLegacyReference) +
                  removeNullValues(entry.SPAALegacyReference) +
                  removeNullValues(entry.RGMALegacyReference) +
                  removeNullValues(entry.UNCDataItemReference) +
                  removeNullValues(entry.IUCDataItemReference) +
                  removeNullValues(entry.DCUSADataItemReference)}
              </td>
              <td>{entry.DataItemName}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    );
  } else {
    const sourceOptions = getDistinctValuesSource(searchResults);
    const targetOptions = getDistinctValuesTarget(searchResults);
    tableFilters = <div className={styles.filterContainer}></div>;
    tableHeader = (
      <>
        <thead className={styles.filterRow}>
          <th className={styles.filterRow}></th>
          <th className={styles.filterRow}></th>
          <th className={styles.filterRow}>
            <Dropdown
              style={`${styles.dataSpecDropDown} ${styles.sourceDropdown} pointer`}
              options={sourceOptions}
              value={[sourceFilterValue, setSourceFilterValue]}
              version={false}
              dropdownType="filter"
              closeFilter={resetFilter}
            />
          </th>
          <th className={styles.filterRow}>
            <Dropdown
              style={`${styles.dataSpecDropDown} ${styles.targetDropdown} pointer`}
              options={targetOptions}
              value={[targetFilterValue, setTargetFilterValue]}
              version={false}
              dropdownType="filter"
              closeFilter={resetFilter}
            />
          </th>
        </thead>
        <thead>
          <th>Scenario Variant Reference</th>
          <th>Scenario Variant Name</th>
          <th>Source</th>
          <th>Target</th>
        </thead>
      </>
    );

    tableBody = (
      <tbody>
        {searchResults.map((entry) => (
          <Link
            key={entry.EnergyMarketMessageScenarioVariantIdentifier}
            href={{
              pathname: `/dataspec/${latestDataSpecVersion}/scenario-variant/[scenarioVariant]`,
              query: {
                scenarioVariant:
                  entry.EnergyMarketMessageScenarioVariantIdentifier,
              },
            }}
            passHref={true}
          >
            <tr
              key={entry.EnergyMarketMessageScenarioVariantIdentifier}
              className={`${styles.searchResultsRow} pointer`}
            >
              <td>{entry.EnergyMarketMessageScenarioVariantIdentifier}</td>
              <td>{entry.EnergyMarketMessageScenarioVariantName}</td>
              <td>{entry.SourceName}</td>
              <td>{entry.TargetName}</td>
            </tr>
          </Link>
        ))}
      </tbody>
    );
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
