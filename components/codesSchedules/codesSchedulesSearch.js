import styles from "../../styles/codesSchedulesSearch.module.css";
import { useEffect, useState } from "react";
import CodesSchedulesSearchForm from "./codesSchedulesSearchForm";
import createCSSearchResults from "./createCSSearchResults";
import Head from "next/head";
import { CodesSchedulesFilter } from "./codesSchedulesFilter";

/**
 * CodesSchedulesSearch wrapper. Includes Header, description, MessageFilters, CodesSchedulesSearchForm, and table with searchResults
 * for codes schedules page
 */
function CodesSchedulesSearch(props) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [isLatestVersionSelected, setIsLatestVersionSelected] = useState(true);
  const [displayResults, setDisplayResults] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [schedulesFilterValue, setSchedulesFilterValue] =
    useState("Filter Schedules:");

  // sets schedulesFilterValue back to initial, unselected state. Used in MessageFilters
  const clearFilter = () => {
    setSchedulesFilterValue("Filter Schedules:");
  };

  let latestResults;
  const latestVersions = {};

  if (searchResults) {
    latestResults = searchResults
      .sort((a, b) => b.versionName.localeCompare(a.versionName))
      .filter((el) => {
        const key = `${el.clauseReference} ${el.documentName}`;
        if (latestVersions[key] === undefined) {
          latestVersions[key] = el.versionName;
        }
        return latestVersions[key] === el.versionName;
      });
  }

  useEffect(() => {
    setDisplayResults(latestResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults]);

  const handleAllClick = () => {
    setIsLatestVersionSelected(false);
    setDisplayResults(searchResults);
  };

  const handleLatestClick = () => {
    setIsLatestVersionSelected(true);
    setDisplayResults(latestResults);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>EMAR Codes Schedules</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={styles.searchContainer}>
        <h1 className={styles.searchBoxHeader}>Codes Schedules Search</h1>
        <p className={styles.text}>
          Here you can search for Codes Schedules. Into the text box below you
          can enter any term which you are looking for and we will show you all
          of the clauses which contain that term. We&apos;ll also tell you if we
          cant find the term. If you know the specific schedule which you want
          to search then you can use the filter directly below.
        </p>
        {CodesSchedulesFilter(
          props.codesSchedulesDataJson,
          schedulesFilterValue,
          setSchedulesFilterValue,
          clearFilter
        )}

        {CodesSchedulesSearchForm(
          setSearchResults,
          errorMessage,
          setErrorMessage,
          setSearchPhrase,
          schedulesFilterValue
        )}
      </div>
      {searchResults
        ? createCSSearchResults(
            displayResults,
            errorMessage,
            searchPhrase,
            handleAllClick,
            handleLatestClick,
            isLatestVersionSelected
          )
        : null}
    </div>
  );
}

export default CodesSchedulesSearch;
