import { useRouter } from "next/router";
import styles from "../../styles/codesSchedulesSearch.module.css";
export const CodesSchedulesSearchResults = (
  searchResults,
  latestDataSpecVersion,
  searchPhrase
) => {
  const router = useRouter();

  const tableHeader = (
    <thead>
      <th>Version</th>
      <th>Document Name</th>
      <th>Clause Reference</th>
      <th>Clause Text</th>
      <th>searchPhrase</th>
    </thead>
  );
  const tableBody = (
    <tbody>
      {/* {searchResults.map((entry) => (
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
          <td>{entry.componentText}</td>
        </tr>
      ))} */}

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
            <td>{entry.clauseReference}</td>
            <td>{entry.versionName}</td>
            <td>
              <i>{entry.documentName}</i>
            </td>
            <td>
              {entry.componentText.replaceAll(
                searchPhrase,
                `<i>${searchPhrase}</i>`
              )}
            </td>
            {/* <td>
              {entry.componentText
                .split(searchPhrase)
                .join("<i>" + searchPhrase + "</i>")}
            </td> */}
            <td>
              <b className={styles.color}>{searchPhrase}</b>
            </td>
          </tr>
        );
      })}
    </tbody>
  );

  return [tableHeader, tableBody];
};
