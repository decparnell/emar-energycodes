import styles from "../../styles/codesSchedulesSearch.module.css";
import sanitizeForUrl from "../helperFunctions/sanitizeForUrl";

const CodesSchedulesSearchForm = (
  setSearchResults,
  errorMessage,
  setErrorMessage,
  setSearchPhrase,
  schedulesFilterValue
) => {
  const completeSearch = async (event) => {
    let documentId = "";
    if (typeof schedulesFilterValue == "object") {
      documentId = schedulesFilterValue.documentId;
    } else {
      documentId = schedulesFilterValue;
    }
    setSearchResults(null);
    setErrorMessage(null);
    event.preventDefault(); // don't redirect the page

    const searchPhrase = event.target.searchPhrase.value;
    const alteredSearchPhrase = sanitizeForUrl(searchPhrase);

    try {
      let dataReq = await fetch(
        `https://prod-10.uksouth.logic.azure.com/workflows/53359f3f225a48f681c60120fceed2fd/triggers/manual/paths/invoke/searchPhrase/${encodeURIComponent(
          alteredSearchPhrase
        )}/documentId/${encodeURIComponent(
          documentId
        )}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nRdlEoLJ91Ha3ExMDx2493S_8WgALiFN7YARzkUJSEU`
      );

      const dataJson = await dataReq.json();
      if (dataJson?.error != null) {
        throw "";
      }
      setSearchPhrase(searchPhrase);
      setSearchResults(dataJson);
    } catch (err) {
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
