import { useRouter } from "next/router";
import styles from "../../styles/codesSchedulesSearch.module.css";
export const CodesSchedulesSearchResults = (searchResults, searchPhrase) => {
  const router = useRouter();
  //console.log(searchResults);
  function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  function formatSearchPhrase(entry, searchPhrase) {
    let data = "";
    if (entry != undefined) {
      data = entry;
    }
    const regex = new RegExp(escapeRegex(searchPhrase), "ig");
    const matches = Array.from(entry.matchAll(regex));
    return entry.split(regex).flatMap((e, index) => [
      e,
      <span key={index} className={styles.color}>
        {matches[index]?.[0]}
      </span>,
    ]);
  }

  const formatSearchByType = (entry, searchPhrase) => {
    let output = "";
    //output = formatSearchPhrase(entry.componentText, searchPhrase);
    if (
      entry.componentType != "tableHeader" &&
      entry.componentType != "tableData"
    ) {
      output = formatSearchPhrase(entry.componentText, searchPhrase);
    } else {
      const tableText = entry.componentText.split("|||");
      const tdList = [];
      for (const i in tableText) {
        tdList.push(<td>{formatSearchPhrase(tableText[i], searchPhrase)}</td>);
      }
      output = (
        <table className={styles.searchResultsTableRow}>
          <tbody>
            <tr>
              {tdList}
              {/* tableText.map((data) => {
                <td>{formatSearchPhrase(data, searchPhrase)}</td>
              }) */}
            </tr>
          </tbody>
        </table>
      );
    }
    return output;
  };

  const tableHeader = (
    <thead>
      <tr>
        <th>Version</th>
        <th>Document Name</th>
        <th>Clause Reference</th>
        <th>Clause Text</th>
      </tr>
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
            <td>{formatSearchByType(entry, searchPhrase)}</td>
          </tr>
        );
      })}
    </tbody>
  );

  return [tableHeader, tableBody];
};
