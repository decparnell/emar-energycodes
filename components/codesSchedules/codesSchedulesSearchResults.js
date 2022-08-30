import { useRouter } from "next/router";
import styles from "../../styles/codesSchedulesSearch.module.css";
export const CodesSchedulesSearchResults = (
  searchResults,
  // latestScheduleVersion,
  searchPhrase
  // schedulesFilterValue,
  // setSchedulesFilterValue,
  // resetFilter
) => {
  const router = useRouter();

  function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  const formatSearchPhrase = (entry, searchPhrase) => {
    const regex = new RegExp(escapeRegex(searchPhrase), "ig");
    const matches = Array.from(entry.matchAll(regex));
    return entry.split(regex).flatMap((e, index) => [
      e,
      <span key={index} className={styles.color}>
        {matches[index]?.[0]}
      </span>,
    ]);
  };

  const tableHeader = (
    <thead>
      <th>Version</th>
      <th>Document Name</th>
      <th>Clause Reference</th>
      <th>Clause Text</th>
    </thead>
  );

  const tableBody = (
    <tbody>
      {searchResults.map((entry) => {
        return (
          <tr
            key={entry.componentId}
            onClick={() =>
              router.push(
                `/codes-schedules/${entry.documentId_FK}/${entry.versionName}#${entry.componentId}`
              )
            }
            className={`${styles.searchResultsRow} pointer`}
          >
            <td>{entry.versionName}</td>
            <td>{entry.documentName}</td>
            <td>{entry.clauseReference}</td>
            <td>{formatSearchPhrase(entry.componentText, searchPhrase)}</td>
          </tr>
        );
      })}
    </tbody>
  );

  return [tableHeader, tableBody];
};
