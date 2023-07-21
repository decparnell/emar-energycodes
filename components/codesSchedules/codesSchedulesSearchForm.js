import styles from "../../styles/codesSchedulesSearch.module.css";
import sanitizeForUrl from "../helperFunctions/sanitizeForUrl";

/**
 * form consisting of input field and submit button
 */
const CodesSchedulesSearchForm = (
  setSearchResults,
  errorMessage,
  setErrorMessage,
  setSearchPhrase,
  schedulesFilterValue
) => {
  // submit handler
  const completeSearch = async (event) => {
    let documentId = "";
    if (typeof schedulesFilterValue == "object") {
      documentId = schedulesFilterValue.documentId;
    } else {
      documentId = schedulesFilterValue;
    }
    // clean up before setting new results
    setSearchResults(null);
    setErrorMessage(null);
    event.preventDefault(); // don't redirect the page

    // get search phrase from input field
    const searchPhrase = event.target.searchPhrase.value;
    // remove special charachters from searchPhrase
    const alteredSearchPhrase = sanitizeForUrl(searchPhrase);

    try {
      // get data from api based on search phrase and documentId
      // searchCodeSchedules-LogicApp
      let dataReq = await fetch(
        `https://prod-10.uksouth.logic.azure.com/workflows/53359f3f225a48f681c60120fceed2fd/triggers/manual/paths/invoke/searchPhrase/${encodeURIComponent(
          alteredSearchPhrase
        )}/documentId/${encodeURIComponent(
          documentId
        )}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nRdlEoLJ91Ha3ExMDx2493S_8WgALiFN7YARzkUJSEU`
      );

      const dataJson = await dataReq.json();

      // if api response has an "error" key then it doesn't contain valid search results
      if (dataJson?.error != null) {
        throw "";
      }

      // set search results from api response
      setSearchPhrase(searchPhrase);
      setSearchResults(dataJson);
    } catch (err) {
      // show error message if api call failed, couldn't be parsed or "error" key is present
      setErrorMessage(`No results found for "${searchPhrase}"`);
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={completeSearch}>
      <input
        id="searchPhrase"
        name="searchPhrase"
        type="text"
        placeholder="Text Search"
        autoComplete="on"
        required
        className={styles.textInput}
      />
      <button
        type="submit"
        className={`${styles.searchButton} medium_button pointer`}
      >
        Search
      </button>
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : null}
    </form>
  );
};

export default CodesSchedulesSearchForm;
