import styles from "../../styles/codesSchedulesSearch.module.css";
import { useState, useContext, useEffect } from "react";
import CodesSchedulesSearchForm from "./codesSchedulesSearchForm";
import createCSSearchResults from "./createCSSearchResults";
import AppContext from "../context/AppContext";
import Head from "next/head";
import SecondNavbar from "../layout/secondHeader";
import { MessageFilters } from "./codesSchedulesFilter";
// import { getDistinctValuesSchedules } from "../dataspec/functions/getDistinctValues";

function CodesSchedulesSearch(props) {
  const value = useContext(AppContext);
  const { latestScheduleVersion } = value.state;
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [clearFilter, setClearFilter] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [schedulesFilterValue, setSchedulesFilterValue] =
    useState("Filter schedules:");

  useEffect(() => {
    if (searchResults && !schedulesFilterValue.includes("Filter")) {
      setSearchResults(
        searchResults.filter(
          (result) => result.documentName == schedulesFilterValue
        )
      );
    }
  }, [schedulesFilterValue]); // Only re-run the effect if count changes

  function resetFilter() {
    setSchedulesFilterValue("Filter schedules:");
    setClearFilter("Filter schedules:");
    setSearchResults(clearFilter);
  }

  // console.log(
  //   "SEARCHRES:",
  //   searchResults.map((res) => console.log(res.documentName))
  // );

  return (
    <div className={styles.container}>
      <Head>
        <title>EMAR Codes Schedules</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={styles.searchContainer}>
        <SecondNavbar />
        <h1 className={styles.searchBoxHeader}>Codes Schedules Search</h1>
        <p>Here you can search for Codes Schedules</p>
        {searchResults
          ? MessageFilters(
              searchResults,
              schedulesFilterValue,
              setSchedulesFilterValue,
              resetFilter
            )
          : null}

        {CodesSchedulesSearchForm(
          setSearchResults,
          errorMessage,
          setErrorMessage,
          setSearchPhrase,
          setSchedulesFilterValue,
          setClearFilter
        )}
      </div>
      {searchResults
        ? createCSSearchResults(
            searchResults,
            errorMessage,
            latestScheduleVersion,
            searchPhrase,
            schedulesFilterValue,
            setSchedulesFilterValue,
            resetFilter
          )
        : null}
    </div>
  );
}

export default CodesSchedulesSearch;
