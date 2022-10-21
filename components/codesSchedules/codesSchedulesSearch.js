import styles from "../../styles/codesSchedulesSearch.module.css";
import { useState } from "react";
import CodesSchedulesSearchForm from "./codesSchedulesSearchForm";
import createCSSearchResults from "./createCSSearchResults";
import Head from "next/head";
import { MessageFilters } from "./codesSchedulesFilter";

function CodesSchedulesSearch(props) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [schedulesFilterValue, setSchedulesFilterValue] =
    useState("Filter Schedules:");

  const clearFilter = () => {
    setSchedulesFilterValue("Filter Schedules:");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>EMAR Codes Schedules</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={styles.searchContainer}>
        <h1 className={styles.searchBoxHeader}>Codes Schedules Search</h1>
        {MessageFilters(
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
        ? createCSSearchResults(searchResults, errorMessage, searchPhrase)
        : null}
    </div>
  );
}

export default CodesSchedulesSearch;
