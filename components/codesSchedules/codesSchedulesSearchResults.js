import { useRouter } from "next/router";
import styles from "../../styles/codesSchedulesSearch.module.css";

/**
 * search results table header and body, to be embedded in createCSSearchResults
 */
export const CodesSchedulesSearchResults = (searchResults, searchPhrase) => {
  const router = useRouter();

  // sort results in descending order based on versionName (3.0.0)
  searchResults = searchResults.sort((a, b) =>
    b.versionName.localeCompare(a.versionName)
  );

  // escape regex patterns in a string to produce a string-matching regex from it.
  // regex is used for highlighting search phrase in results
  function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  // used to highlight search phrase in every search result entry
  function formatSearchPhrase(entry, searchPhrase) {
    let data = "";
    if (entry != undefined) {
      data = entry;
    }
    const regex = new RegExp(escapeRegex(searchPhrase), "ig");
    // use regex to conviniently find all search phrase matches
    const matches = Array.from(entry.matchAll(regex));
    // return an array of jsx elements having search phrase wrapped in a span
    // (example: ["this is ", "<span>information</span>", " about..."] )
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
  // creating table headers for search results
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
  // populating table body with results with highlighted search phrase
  const tableBody = (
    <tbody>
      {searchResults?.map((entry) => {
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
