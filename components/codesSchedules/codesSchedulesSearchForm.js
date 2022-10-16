import styles from "../../styles/codesSchedulesSearch.module.css";

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
    const searchPhrase = encodeURIComponent(event.target.searchPhrase.value);

    try {
      let dataReq = await fetch(
        `https://prod-10.uksouth.logic.azure.com/workflows/53359f3f225a48f681c60120fceed2fd/triggers/manual/paths/invoke/searchPhrase/${searchPhrase}/documentId/${documentId}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=nRdlEoLJ91Ha3ExMDx2493S_8WgALiFN7YARzkUJSEU`
      );

      const dataJson = await dataReq.json();
      if (dataJson?.error != null) {
        setErrorMessage(dataJson.error.message);
      } else {
        setSearchPhrase(searchPhrase);
        setSearchResults(dataJson);
      }
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
