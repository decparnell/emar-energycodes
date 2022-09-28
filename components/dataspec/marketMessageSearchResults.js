import Link from "next/link";
import styles from "../../styles/dataspec.module.css";
import addPaddingToGroupId from "./functions/addIdPadding";
import removeNullValues from "./functions/removeNulls";
export const MarketMessageSearchResults = (
  searchResults,
  latestDataSpecVersion
) => {
  const tableHeads = [
    "Market Message Reference",
    "Local Catalogue Reference",
    "Market Message Name",
    "Message Version Number"
  ];
  const tableHeader = (
    <thead>
      {tableHeads.map((item) => (
        <th>{item}</th>
      ))}
    </thead>
  );

  const tableBody = (
    <tbody>
      {searchResults.map((entry) => (
        <Link
          key={entry.DataItemIdentifier}
          href={{
            pathname: "/"
          }}
        >
          <tr
            key={entry.EnergyMarketMessageIdentifier}
            className={`${styles.searchResultsRow} ${styles.pointer}`}
            onClick={() =>
              window.open(
                `/dataspec/${latestDataSpecVersion}/marketmessage/${entry.EnergyMarketMessageIdentifier}`,
                "_blank"
              )
            }
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
            <td>{addPaddingToGroupId(entry.MessageVersionNumber)}</td>
          </tr>
        </Link>
      ))}
    </tbody>
  );

  return [tableHeader, tableBody];
};
