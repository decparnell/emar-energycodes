import styles from "../../styles/dataspec.module.css";
import { useState, useContext, useEffect } from "react";
import SearchForm from "./searchForm";
import createSearchResults from "./createSearchResults";
import AppContext from "../context/AppContext";
import Head from "next/head";
import SecondNavbar from "../layout/secondHeader";
import { MessageFilters } from "./sourceTargetFilters";
function DataSpecSearch(props) {
  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;
  const [mmsv, setMMSV] = useState(props.mmsv);
  const [dataItems, setDataItems] = useState(props.dataItems);
  const [searchResults, setSearchResults] = useState(mmsv);
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

  function resetFilter() {
    setTargetFilterValue("Filter the target:");
    setSourceFilterValue("Filter the source:");
    setSearchResults(clearFilter);
  }

  function switchSearchResults(type) {
    if (type == "mm" || type == "sv") {
      setSearchResults(mmsv);
      setClearFilter(mmsv);
    } else if (type == "di") {
      setSearchResults(dataItems);
      setClearFilter(dataItems);
    }
  }

  function handleButtonClick(newType, e) {
    e.preventDefault();
    setSearchType(newType);
  }

  useEffect(() => {
    switchSearchResults(searchType);
  }, [searchType]);

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
          Here you can search the data specification. Using the buttons below to
          search either the Market Messages, Scenario Variants, or the Data
          Items. The complete list of results can be seen at the bottom of this
          page, or you can use the search options to narrow down the results.
          You can search for EMAR Id&apos;s, Legacy Id&apos;s, the name of the
          item, or the source / target.
        </p>
        <p className={styles.dataSpecExplainaition}>
          (Partials are also permitted)
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

        {searchResults && (searchType == "mm" || searchType == "sv")
          ? MessageFilters(
              searchResults,
              sourceFilterValue,
              setSourceFilterValue,
              targetFilterValue,
              setTargetFilterValue,
              resetFilter
            )
          : null}

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
