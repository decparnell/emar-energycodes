import styles from "../../styles/codesSchedulesSearch.module.css";

const CodesSchedulesSearchForm = (
  setSearchResults,
  errorMessage,
  setErrorMessage,
  setSearchPhrase
) => {
  const completeSearch = async (event) => {
    setSearchResults(null);
    setErrorMessage(null);
    event.preventDefault(); // don't redirect the page
    const searchPhrase = event.target.searchPhrase.value;

    try {
      let dataReq = await fetch(
        `https://prod-11.uksouth.logic.azure.com/workflows/73ec55317d3d4b3cae4775cae40ae29b/triggers/manual/paths/invoke/searchPhrase/${searchPhrase}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KBzsZFIV36_XYxQ4AIJSXJwtuA8LLqlLEotK7SS_OWA`
      );
      const dataJson = await dataReq.json();
      setSearchPhrase(searchPhrase);
      setSearchResults(dataJson);
    } catch (err) {
      setErrorMessage("There has been an error with your search");
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
      {errorMessage ? <p>{errorMessage}</p> : null}
    </form>
  );
};

export default CodesSchedulesSearchForm;
