import styles from "../../../styles/dataSpecSearch.module.css";
import Head from "next/head";
import Tooltip from "@mui/material/Tooltip";
import ResultsTable from "../../../components/infiniteScrollTable";
import GlobalDropDown from "../../../components/dropdown/newIndex";
import { useState, useEffect, useContext } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Button, TextField } from "@mui/material";
import { codeSchdulesHeaders } from "../../../components/settings";
import { LogUserInfo } from "../../../components/logging";
import AppContext from "../../../components/context/AppContext";

function SchedulesSearchPage({ codesSchedulesDataJson }) {
  const value = useContext(AppContext);
  let { searchValue, searchType } = value.state;
  const setSearchValue = value.setSearchValue;
  const [data, setData] = useState([]);
  const [schedulesValue, setSchedulesValue] = useState("Filter Schedules:");
  const [startVal, setStartVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [isSearchValuePresent, setIsSearchValuePresent] = useState(true);

  const searchTypeName = searchType.name;

  useEffect(() => {
    LogUserInfo("Codes Schedules Search");
    if (searchValue !== "") {
      fetchData();
    }
  }, []);

  ///////////////FUNCTIONS/////////////////////////
  //fetch data for the results table (before an actual search has been done)
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    const mappedSearch = searchValue === "" ? "-" : searchValue;

    let documentId = "";
    if (typeof schedulesValue == "object") {
      documentId = schedulesValue.documentId;
    } else {
      documentId = schedulesValue;
    }
    try {
      // get data from api based on search phrase and documentId
      let dataReq = await fetch(
        `https://prod-24.uksouth.logic.azure.com/workflows/94e876daa9674a2da7d7bd4fd0ff70e3/triggers/manual/paths/invoke/startVal/${startVal}/searchPhrase/${encodeURIComponent(
          mappedSearch
        )}/documentId/${encodeURIComponent(
          documentId
        )}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8zgpxYLzHaeqFEccMRAb97nkuk7Xube1mmMjwwjwTq0`
      );

      const dataJson = await dataReq.json();
      const newData = dataJson;
      if (newData.length > 0) {
        if (startVal === 0) {
          setData(newData);
          if (newData.length < 50) {
            setHasMore(false);
          }
        } else if (typeof newData === "undefined") {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...newData]);
        }

        setStartVal((prevVal) => prevVal + 51);
      } else {
        setErrorMessage(`No results found for "${searchValue}"`);
      }

      if (newData.length === 0) {
        setIsLoading(false);
        setHasMore(false);
      }

      // if api response has an "error" key then it doesn't contain valid search results
      if (dataJson?.error != null) {
        throw "";
      }
    } catch (error) {
      setError(error);
      setErrorMessage(`No results found for "${searchValue}"`);
    } finally {
      setIsLoading(false);
    }
  };

  //Future considerations
  // useEffect(() => {
  //     setStartVal(0);
  //     setData([]);
  //     fetchData();
  // }, [searchValue, schedulesValue]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const refreshData = () => {
    setStartVal(0);
    setData([]);
    handleScrollToTop();
  };

  const handleSubmit = (e) => {
    if (searchValue !== "") {
      setIsSearchValuePresent(true);
      e.preventDefault();
      refreshData();
      fetchData();
    } else {
      setIsSearchValuePresent(false);
      e.preventDefault();
    }
  };

  const handleSchedulesValue = (e) => {
    //refreshData();
    // value consist of {documentId: int, documentName: string}
    let schedulesVal = e.target.value;
    if (schedulesVal === "") setSchedulesValue("Filter Schedules:");
    else setSchedulesValue(schedulesVal);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Data Specification Search</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <h1 className={styles.searchBoxHeader}>Codes Schedules Search</h1>
      <div className={`${styles.center}`}>
        <div className={`${styles.searchTop} box`}>
          <div className={styles.help}>
            <Tooltip
              placement="top-start"
              title="Here you can search for Codes Schedules. Into the text box below you can enter any term which you are looking for and we will show you all of the clauses which contain that term. We'll also tell you if we cant find the term. If you know the specific schedule which you want to search then you can use the filter directly below."
            >
              <HelpOutlineIcon className={styles.helpIcon} />
            </Tooltip>
          </div>
          <form className={styles.searchBox} onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label={`Search`}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              variant="outlined"
              size="small"
              fullWidth
            />

            <Button
              className={`${styles.searchButton} green`}
              variant="contained"
              type="submit"
              value="submit"
            >
              Search
            </Button>
          </form>
          <div className={styles.filterContainer}>
            <GlobalDropDown
              label="Filter Schedules:"
              labelValue="documentName"
              labelKey="documentId"
              searchType={searchTypeName}
              value={schedulesValue}
              items={codesSchedulesDataJson}
              handleChange={handleSchedulesValue}
            />
          </div>
        </div>
        {!isSearchValuePresent ? (
          <p className={styles.errorMessage}>
            Please search for a term above in order to see results.
          </p>
        ) : null}
        <div className={`${styles.searchResults}`}>
          {data.length !== 0 || isLoading ? (
            <ResultsTable
              data={data}
              setStartVal={setStartVal}
              headers={codeSchdulesHeaders}
              baseLink="/dataspec/3.3.0/marketmessage"
              searchType={searchTypeName}
              searchValue={searchValue}
              fetchData={fetchData}
              hasMore={hasMore}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SchedulesSearchPage;

export async function getServerSideProps(context) {
  //Logic App: getAllCodeSchedules-LogicApp
  const codesSchedulesDataReq = await fetch(
    `https://prod-04.uksouth.logic.azure.com:443/workflows/51e9e129f1b645ee96aa180a68a2033f/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Cg3T-VLyFtcRDJvXkEEYDLpftYytyNtWpBiD15qXosg`
  );
  const codesSchedulesDataJson = await codesSchedulesDataReq.json();

  return {
    props: {
      codesSchedulesDataJson,
    },
  };
}
