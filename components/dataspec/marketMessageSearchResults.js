import Link from "next/link";
import styles from "../../styles/dataspec.module.css";
import removeNullValues from "./functions/removeNulls";
export const MarketMessageSearchResults = (
  searchResults,
  latestDataSpecVersion
) => {
  const tableHeader = (
    <thead>
      <th>Market Message Reference</th>
      <th>Local Catalogue Reference</th>
      <th>Market Message Name</th>
    </thead>
  );

  const tableBody = (
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
            className={styles.searchResultsRow}
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

  return [tableHeader, tableBody];
};
