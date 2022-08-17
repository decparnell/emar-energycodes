import Link from "next/link";
import styles from "../../styles/dataspec.module.css";
import removeNullValues from "./functions/removeNulls";
export const DataItemSearchResults = (searchResults, latestDataSpecVersion) => {
  const tableHeader = (
    <thead>
      <th>Data Item Reference</th>
      <th>Local Catalogue Reference</th>
      <th>Data Item Name</th>
    </thead>
  );

  const tableBody = (
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

  return [tableHeader, tableBody];
};
