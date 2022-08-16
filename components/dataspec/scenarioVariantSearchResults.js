import Link from "next/link";
import styles from "../../styles/dataspec.module.css";
import Dropdown from "../dropdown";
import {
  getDistinctValuesSource,
  getDistinctValuesTarget,
} from "./functions/getDistinctValues";
export const ScenarioVariantSearchResults = (
  searchResults,
  latestDataSpecVersion,
  sourceFilterValue,
  setSourceFilterValue,
  targetFilterValue,
  setTargetFilterValue,
  resetFilter
) => {
  const sourceOptions = getDistinctValuesSource(searchResults);
  const targetOptions = getDistinctValuesTarget(searchResults);
  const tableFilters = <div className={styles.filterContainer}></div>;
  const tableHeader = (
    <>
      <thead>
        <th>Scenario Variant Reference</th>
        <th>Scenario Variant Name</th>
        <th>Source</th>
        <th>Target</th>
      </thead>
    </>
  );

  const tableBody = (
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
            className={styles.searchResultsRow}
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

  return [tableHeader, tableBody];
};
