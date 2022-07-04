import styles from "../../styles/dataspec.module.css";
import { useState } from "react";
const SearchForm = (
  setSearchResults,
  setSearchType,
  errorMessage,
  setErrorMessage,
  latestDataSpecVersion,
  setSourceFilterValue,
  setTargetFilterValue,
  setClearFilter
) => {
  const completeSearch = async (event) => {
    setSearchResults(null);
    setErrorMessage(null);
    event.preventDefault(); // don't redirect the page
    setSourceFilterValue("Filter the source:");
    setTargetFilterValue("Filter the target:");
    const searchType = event.target.searchCriteria.value;
    const searchValue = event.target.freeTextSearch.value;
    let dataReq = "";

    if (searchType == "mm") {
      //if the search is for a Market Message
      try {
        dataReq = await fetch(
          `https://prod-30.uksouth.logic.azure.com/workflows/4808a11bd7514d369f03f96b9782b473/triggers/manual/paths/invoke/searchValue/${searchValue}/versionNumber/${latestDataSpecVersion}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=P-DN4NmtQf6XC652Ebut-uF0edqbM6TpSw2Jyg6TqqU`
        );
        const dataJson = await dataReq.json();
        setSearchResults(dataJson);
      } catch (err) {
        setErrorMessage(
          "There has been an error with your Market Message search"
        );
      }
    } else if (searchType == "di") {
      //if the search is for a data Item
      try {
        dataReq = await fetch(
          `https://prod-20.uksouth.logic.azure.com/workflows/d3888d5ae4284493a55f78771427fc9e/triggers/manual/paths/invoke/searchValue/${searchValue}/versionNumber/${latestDataSpecVersion}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=C22FRvxwqOYN2oeA2Yqy1z-xTkiQgznNdZcHkuNUMW4`
        );
        const dataJson = await dataReq.json();
        setSearchResults(dataJson);
      } catch (err) {
        setErrorMessage("There has been an error with your Data Item search");
      }
    } else {
      //if the search is for a data Item
      try {
        dataReq = await fetch(
          `https://prod-22.uksouth.logic.azure.com/workflows/7bd16816919943ec874d9f8c75abbb53/triggers/manual/paths/invoke/searchValue/${searchValue}/versionNumber/${latestDataSpecVersion}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=v5uzKDNcrVgvX31rV28DTjd1L_ag257HedtJ2aDX9Ig`
        );
        const dataJson = await dataReq.json();
        setSearchResults(dataJson);
        setClearFilter(dataJson);
      } catch (err) {
        setErrorMessage(
          "There has been an error with your Scenario Variant search"
        );
      }
    }
    setSearchType(searchType);
  };

  return (
    <form onSubmit={completeSearch} className={styles.searchForm}>
      <input
        id="freeTextSearch"
        name="freeTextSearch"
        type="text"
        autoComplete="on"
        required
        className={styles.textInput}
      />
      <input
        type="radio"
        value="mm"
        name="searchCriteria"
        defaultChecked
        className={styles.radio}
      />{" "}
      Market Message (Data Flow)
      <input
        type="radio"
        value="di"
        name="searchCriteria"
        className={styles.radio}
      />{" "}
      Data Item
      <input
        type="radio"
        value="sv"
        name="searchCriteria"
        className={styles.radio}
      />{" "}
      Scenario Variant
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : null}
    </form>
  );
};

export default SearchForm;
