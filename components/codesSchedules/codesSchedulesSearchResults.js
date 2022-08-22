import { useRouter } from "next/router";
import styles from "../../styles/codesSchedulesSearch.module.css";
export const CodesSchedulesSearchResults = (searchResults) => {
  const router = useRouter();
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
      {searchResults.map((entry) => (
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
      ))}
    </tbody>
  );

  return [tableHeader, tableBody];
};
