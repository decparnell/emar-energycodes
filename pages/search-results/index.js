import { useContext, useState, useEffect } from "react"
import AppContext from "../../components/context/AppContext";
import Head from "next/head";
import styles from "../../styles/dataSpecSearch.module.css"
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Button, TextField } from "@mui/material";
import ResultsTable from "../../components/infiniteScrollTable";
import { searchResultsHeaders } from "../../components/settings";

function SearchResults() {

    const value = useContext(AppContext);
    let { searchValue, latestDataSpecVersion } = value.state;
    const setSearchValue = value.setSearchValue;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [startVal, setStartVal] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isSearchValuePresent, setIsSearchValuePresent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await refreshData();

        if (searchValue !== "") {
            setIsSearchValuePresent(false);
            fetchData(0);
        } else {
            setIsSearchValuePresent(true);
        }

    };

    useEffect(() => {
        if (searchValue !== "") {
            fetchData();
        }
    }, []);

    const refreshData = async () => {
        return new Promise((resolve, reject) => {
            try {
                setData([]);
                setStartVal(0);
                setHasMore(true);
                setIsSearchValuePresent(false);
                resolve();
            } catch (error) {
                reject(error); // Reject the promise if an error occurs
            }
        });
    };

    const fetchData = async (deafultStartVal) => {
        setIsLoading(true);
        const mappedSearch = searchValue === "" ? "-" : searchValue;
        const mappedStartVal = deafultStartVal !== undefined ? deafultStartVal : startVal;

        try {

            //LogicApp: searchAnyTem-LogicApp
            let dataReq = await fetch(
                `https://prod-24.uksouth.logic.azure.com/workflows/33a67399c7c24618885894391732afb9/triggers/manual/paths/invoke/startVal/${mappedStartVal}/searchPhrase/${encodeURIComponent(mappedSearch)}/versionNumber/${latestDataSpecVersion}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=QogJHYFtJ7Tx1EqWERuam4JRXORrQ3Vr9WbVEupJCvE`
            );

            const dataJson = await dataReq.json();
            const newData = dataJson;

            const dataitem = newData.dataitems;
            const marketmessage = newData.marketmessage;
            const scenariovariant = newData.scenariovariant;
            const schedules = newData.schedules
            if (dataitem.length > 0 || marketmessage.length > 0 || scenariovariant.length > 0 || schedules.length > 0) {
                const consolidatedData = [...dataitem, ...marketmessage, ...scenariovariant, ...schedules];

                if (startVal === 0) {
                    setData(consolidatedData);
                }
                else {
                    setData((prevData) => [...prevData, ...consolidatedData]);
                }

                if (consolidatedData.length < 50) {
                    setHasMore(false);
                }

                setStartVal((prevVal) => prevVal + 51);
            }


        } catch (error) {
            setError(error);
            setErrorMessage(`No results found for "${searchValue}"`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Search Result</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <h1 className={styles.searchBoxHeader}>Search Results</h1>
            <div className={`${styles.center}`}>
                <div className={`${styles.searchTop} box`}>
                    <div className={styles.help}>
                        <Tooltip
                            placement="top-start"
                            title="Here you can search for both Codes Schedules and Data Specification. Into the text box below you can enter any term which you are looking for and we will show you all of the clauses which contain that term. We'll also tell you if we cant find the term."
                        >
                            <HelpOutlineIcon className={styles.helpIcon} />
                        </Tooltip>
                    </div>
                    <form className={styles.searchBoxOnly}>
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
                            onClick={handleSubmit}
                        >
                            Search
                        </Button>
                    </form>
                </div>
            </div>
            {isSearchValuePresent ? (
                <div className={styles.errorContainer}>
                    <span className={styles.errorMessage}>
                        Search field
                    </span>
                    <span> cannot be blank</span>
                </div>
            ) : null}
            <div className={`${styles.searchResults}`}>
                {data.length !== 0 || isLoading ? (
                    <ResultsTable
                        data={data}
                        setStartVal={setStartVal}
                        headers={searchResultsHeaders[0]}
                        searchType={"SearchResults"}
                        searchValue={searchValue}
                        fetchData={fetchData}
                        hasMore={hasMore}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                    />) : <p>No data available.</p>}
            </div>
        </div>
    );
}

export default SearchResults;