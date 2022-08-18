import Link from "next/link";
import { useRouter } from "next/router";
// import styles from "../../styles/dataspec.module.css";
// import removeNullValues from "./functions/removeNulls";
export const CodesSchedulesSearchResults = (searchResults) => {
  const router = useRouter();
  const tableHeader = (
    <thead>
      <th>clauseReference</th>
      <th>version name</th>
      <th>Document name</th>
      <th>text</th>
    </thead>
  );
  const tableBody = (
    <tbody>
      {searchResults.map((entry) => (
        <tr
          key={entry.componentId}
          onClick={() =>
            router.push(
              `/codes-schedules/${entry.documentId_FK}/${entry.versionName}#${entry.componentId}`
            )
          }
        >
          <td>{entry.clauseReference}</td>
          <td>{entry.versionName}</td>
          <td>{entry.documentName}</td>
          <td>{entry.componentText}</td>
        </tr>
      ))}
      {/* {searchResults.map((entry) => (
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
      ))} */}
    </tbody>
  );

  return [tableHeader, tableBody];
};
