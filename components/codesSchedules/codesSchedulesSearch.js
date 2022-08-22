import styles from "../../styles/codesSchedulesSearch.module.css";
import { useState, useContext, useEffect } from "react";
import CodesSchedulesSearchForm from "./codesSchedulesSearchForm";
import createCSSearchResults from "./createCSSearchResults";
import AppContext from "../context/AppContext";
import Head from "next/head";
import SecondNavbar from "../layout/secondHeader";

function CodesSchedulesSearch(props) {
  const value = useContext(AppContext);
  const { latestScheduleVersion } = value.state;
  const [searchPhrase, setSearchPhrase] = useState("yo");
  const [searchResults, setSearchResults] = useState("");
  const [errorMessage, setErrorMessage] = useState();

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
        {CodesSchedulesSearchForm(
          setSearchResults,
          errorMessage,
          setErrorMessage,
          setSearchPhrase
        )}
      </div>
      {searchResults
        ? createCSSearchResults(
            searchResults,
            errorMessage,
            latestScheduleVersion,
            searchPhrase
          )
        : null}
    </div>
  );
}

export default CodesSchedulesSearch;
