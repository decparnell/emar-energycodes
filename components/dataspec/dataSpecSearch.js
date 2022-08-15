import styles from "../../styles/dataspec.module.css";
import { useState, useContext, useEffect } from "react";
import SearchForm from "./searchForm";
import createSearchResults from "./createSearchResults";
import AppContext from "../context/AppContext";
import Head from "next/head";
import SecondNavbar from "../layout/secondHeader";

function DataSpecSearch() {
  const [searchResults, setSearchResults] = useState();
  const [clearFilter, setClearFilter] = useState();
  const [searchType, setSearchType] = useState("mm");
  const [errorMessage, setErrorMessage] = useState();
  const [sourceFilterValue, setSourceFilterValue] =
    useState("Filter the source:");
  useEffect(() => {
    if (searchResults && !sourceFilterValue.includes("Filter")) {
      setSearchResults(
        searchResults.filter((result) => result.SourceName == sourceFilterValue)
      );
    }
  }, [sourceFilterValue]); // Only re-run the effect if count changes

  const [targetFilterValue, setTargetFilterValue] =
    useState("Filter the target:");
  useEffect(() => {
    if (searchResults && !targetFilterValue.includes("Filter")) {
      setSearchResults(
        searchResults.filter((result) => result.TargetName == targetFilterValue)
      );
    }
  }, [targetFilterValue]); // Only re-run the effect if count changes
  const value = useContext(AppContext);
  let { latestDataSpecVersion, allDataSpecVersions } = value.state;

  function resetFilter() {
    setTargetFilterValue("Filter the target:");
    setSourceFilterValue("Filter the source:");
    setSearchResults(clearFilter);
  }

  function handleButtonClick(newType, e) {
    e.preventDefault();
    setSearchType(newType);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>EMAR Data Specification</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={styles.searchContainer}>
        <SecondNavbar />
        <h1 className={styles.searchBoxHeader}>Data Specification Search</h1>
        <p className={styles.dataSpecExplainaition}>
          Here you can search the data specification for either Market Message;
          Scenario Variants; and Data Items.
        </p>
        <p className={styles.dataSpecExplainaition}>
          This will allow you to view the data flows for all of the messages.
        </p>
        <p className={styles.dataSpecExplainaition}>
          Into the search box you can type either the new id; the legacy id; or
          the name of the item you are searching for (Partials are also
          permitted)
        </p>
        <div className={styles.searchTypeButtons}>
          {searchType == "mm" ? (
            <button
              className={`medium_button ${styles.searchTypeButton}  ${styles.chosen}`}
              onClick={(e) => handleButtonClick("mm", e)}
            >
              Market Message
            </button>
          ) : (
            <button
              className={`medium_button ${styles.searchTypeButton}`}
              onClick={(e) => handleButtonClick("mm", e)}
            >
              Market Message
            </button>
          )}

          {searchType == "sv" ? (
            <button
              className={`medium_button ${styles.searchTypeButton} ${styles.chosen}`}
              onClick={(e) => handleButtonClick("sv", e)}
            >
              Scenario Variant
            </button>
          ) : (
            <button
              className={`medium_button ${styles.searchTypeButton}`}
              onClick={(e) => handleButtonClick("sv", e)}
            >
              Scenario Variant
            </button>
          )}

          {searchType == "di" ? (
            <button
              className={`medium_button ${styles.searchTypeButton}  ${styles.chosen}`}
              onClick={(e) => handleButtonClick("di", e)}
            >
              Data Item
            </button>
          ) : (
            <button
              className={`medium_button ${styles.searchTypeButton}`}
              onClick={(e) => handleButtonClick("di", e)}
            >
              Data Item
            </button>
          )}
        </div>

        {searchType == "mm" || searchType == "sv" ? (
          <div className={styles.sourceTargetFilters}>.</div>
        ) : null}
        {SearchForm(
          setSearchResults,
          searchType,
          errorMessage,
          setErrorMessage,
          latestDataSpecVersion,
          setSourceFilterValue,
          setTargetFilterValue,
          setClearFilter
        )}
      </div>
      {searchResults
        ? createSearchResults(
            searchResults,
            searchType,
            errorMessage,
            sourceFilterValue,
            setSourceFilterValue,
            targetFilterValue,
            setTargetFilterValue,
            latestDataSpecVersion,
            resetFilter
          )
        : null}
    </div>
  );
}

export default DataSpecSearch;
