import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext } from "react";
import styles from "../../styles/infiniteScrollTable.module.css";
import { CodesSchedulesSearchResults } from "../codesSchedules/codesSchedulesSearchResults";
import AppContext from "../context/AppContext";

const ResultsTable = (props) => {
  /////// PROPS
  //array of length 2 [data to be displayed, function to set data variable]
  let data = props.data;
  //array of header objects with 2 properties:title & dataColumn
  /* headers = [
    { title: "Identifier", dataColumn: "EnergyMarketMessageIdentifier" },
    { title: "Local Reference", dataColumn: "LegacyIdentifier" },
    { title: "Message Name", dataColumn: "Label" },
  ]; */
  const headers = props.headers;
  //base link for making the table clickable through to other pages ( first column of the headers will be appended to create the link.)
  const baseLink = props.baseLink;
  //the api address to call to get the next batch of data
  const fetchData = props.fetchData;

  // has more data on the props.data - required for the infinite scroll
  const hasMore = props.hasMore;
  // isloading - is the fetchData still executing the api
  const isLoading = props.isLoading;
  const searchType = props.searchType;
  const searchValue = props.searchValue;
  const errorMessage = props.errorMessage;

  const value = useContext(AppContext);
  let { currentVersionMapping } = value.state;

  /////////FUNCTIONS///////////////
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

  function returnTableDataForHeaders(item) {
    let jsxArray = [];
    headers.map((row) => {
      if (
        searchType === "Codes Schedules" &&
        row.dataColumn === "componentText"
      ) {
        jsxArray.push(
          <td key={row.title}>{formatSearchByType(item, searchValue)}</td>
        );
        //jsxArray.push(<td key={row.title}>{item[row.dataColumn]}</td>);
      } else {
        jsxArray.push(<td key={row.title}>{item[row.dataColumn]}</td>);
      }
    });
    return jsxArray;
  }

  const GenerateSchedulesRow = (props) => {
    const filteredMapping = currentVersionMapping.filter(
      (subitem) => subitem.documentId == props.item.documentId_FK
    );

    if (filteredMapping.length != 0) {
      const currentDocVersionName = filteredMapping[0].docVersionName;
      const baseLink = `/codes-schedules/${props.item.documentId_FK}/${currentDocVersionName}`;
      return (
        <Link key={props.index} href={baseLink}>
          <tr key={props.index}>{returnTableDataForHeaders(props.item)}</tr>
        </Link>
      );
    } else {
      const definitionLink = `/codes-schedules/definitions/${props.item.documentId_FK}`;
      return (
        <Link key={props.index} href={definitionLink}>
          <tr key={props.index}>{returnTableDataForHeaders(props.item)}</tr>
        </Link>
      );
    }
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        data.length === 0 && !isLoading ? (
          <p>No data available.</p>
        ) : (
          <p>Loading...</p>
        )
      }
      endMessage={<p>No more data to load.</p>}
      className={styles.scroll}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((head, index) => {
              return <th key={index}>{head.title}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {searchType === "Codes Schedules"
            ? data.map((item, index) => {
              return (
                <GenerateSchedulesRow item={item} index={index} key={index} />
              );
            })
            : data.map((item, index) => {
              if (typeof baseLink !== "undefined") {
                return (
                  <Link
                    key={index}
                    href={`${baseLink}/${item[headers[0].dataColumn]}`}
                  >
                    <tr>{returnTableDataForHeaders(item)}</tr>
                  </Link>
                );
              } else {
                return <tr key={index}>{returnTableDataForHeaders(item)}</tr>;
              }
            })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default ResultsTable;
