import styles from "../../../styles/dataSpecSearch.module.css";
import AppContext from "../../../components/context/AppContext";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ResultsTable from "../../../components/infiniteScrollTable";
import SideNav from "../../../components/dashboardSideNav";
import Tooltip from "@mui/material/Tooltip";
import GlobalDropDown from "../../../components/dropdown/newIndex";
import {
  dataSpecSerachTypes,
  marketMessageHeaders,
  scenarioVariantHeaders,
  dataItemHeaders,
} from "../../../components/settings";
import { Button, TextField } from "@mui/material";
import {
  getDistinctValuesSource,
  getDistinctValuesTarget,
} from "../../../components/dropdown/functions/formatDropdownItems";
import { LogUserInfo } from "../../../components/logging";

function DataSpecSearchPage({ dataSpecSearchList }) {
  const value = useContext(AppContext);
  let { latestDataSpecVersion, searchValue, searchType } = value.state;
  const setSearchValue = value.setSearchValue;
  const setSearchType = value.setSearchType;
  const [data, setData] = useState([]);
  const [startVal, setStartVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [sourceTargetList, setsourceTargetList] = useState(dataSpecSearchList);
  const [sourceOptions, setsourceOptions] = useState(
    getDistinctValuesSource(sourceTargetList)
  );
  const [targetOptions, settargetOptions] = useState(
    getDistinctValuesTarget(sourceTargetList)
  );
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [isSearchValuePresent, setIsSearchValuePresent] = useState(false);

  const headers =
    searchType.name === "Market Messages"
      ? marketMessageHeaders
      : searchType.name === "Scenario Variants"
      ? scenarioVariantHeaders
      : dataItemHeaders;

  const pathName =
    searchType.name === "Market Messages"
      ? "marketmessage"
      : searchType.name === "Scenario Variants"
      ? "scenario-variant"
      : "dataitem";

  // const sourceOptions = getDistinctValuesSource(dataSpecSearchList);
  // const targetOptions = getDistinctValuesTarget(dataSpecSearchList);

  const latestRecVersion = latestDataSpecVersion;

  ///////////////FUNCTIONS/////////////////////////
  //fetch data for the results table (before an actual search has been done)
  const fetchData = async (deafultStartVal) => {
    setIsLoading(true);
    setError(null);
    const mappedSource = source === "" ? "-" : source;
    const mappedTarget = target === "" ? "-" : target;
    const mappedSearch = searchValue === "" ? "-" : searchValue;
    const mappedStartVal =
      deafultStartVal !== undefined ? deafultStartVal : startVal;

    try {
      //Logic App: getAllDataSpecData-LogicApp-v3
      const response = await fetch(
        `https://prod-21.uksouth.logic.azure.com/workflows/7c36ed459a774082956345055c9c70ef/triggers/manual/paths/invoke/searchType/${searchType.name}/startVal/${mappedStartVal}/source/${mappedSource}/target/${mappedTarget}/search/${mappedSearch}/versionNumber/${latestRecVersion}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VieTZy8bvqkgfrZnz_nwMPD6zXcSxK6sMFMcbHkrqBA`
      );

      const dataSpecDataJson = await response.json();
      const newData = dataSpecDataJson.Table1;

      if (newData.length > 0) {
        if (newData.length < 50) {
          setHasMore(false);
        }
        if (startVal === 0) {
          setData(newData);
        } else if (typeof newData === "undefined") {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...newData]);
        }
        setStartVal((prevVal) => prevVal + 51);
      } else {
        setErrorMessage(`No results found for "${searchValue}"`);
      }
    } catch (error) {
      setError(error);
      setErrorMessage(`No results found for "${searchValue}"`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchType, source, target]);

  //////////////HANDLING FUNCTIONS/////////////////
  //scroll to the top of the page when the button is clicked
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const refreshData = async () => {
    return new Promise((resolve, reject) => {
      try {
        setData([]);
        setStartVal(0);
        setHasMore(true);
        setIsSearchValuePresent(false);
        handleScrollToTop();
        resolve();
      } catch (error) {
        reject(error); // Reject the promise if an error occurs
      }
    });
  };
  //handle click of search type buttons
  const handleSideNavClick = (type) => {
    refreshData();
    setSearchType(type);
  };

  const handleSourceChange = (e) => {
    refreshData();
    const sourceVal = e.target.value;
    setSource(sourceVal);

    if (sourceVal === "") {
      resetDropdownFilter();
    } else {
      const filteredTargets = sourceTargetList.filter(
        (result) => result.SourceName == sourceVal
      );
      settargetOptions(getDistinctValuesTarget(filteredTargets));
    }
  };

  const handleTargetChange = (e) => {
    refreshData();
    const sourceVal = e.target.value;
    setTarget(sourceVal);
    if (sourceVal === "") {
      resetDropdownFilter();
    } else {
      const filteredSource = sourceTargetList.filter(
        (result) => result.TargetName == sourceVal
      );
      setsourceOptions(getDistinctValuesSource(filteredSource));
    }
  };

  function resetDropdownFilter() {
    setsourceOptions(getDistinctValuesSource(sourceTargetList));
    settargetOptions(getDistinctValuesTarget(sourceTargetList));
    if (searchValue === "") {
      refreshData();
    }
  }

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
    LogUserInfo("VIEW: Data Spec Search");
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Data Specification Search</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className={styles.left}>
        <SideNav
          items={dataSpecSerachTypes}
          name="name"
          stateVar={searchType}
          stateSet={handleSideNavClick}
        />
      </div>
      <div className={`${styles.right}`}>
        <div className={`${styles.searchTop} box`}>
          <div className={styles.help}>
            <Tooltip
              placement="top-start"
              title="Here you can search the data specification. Use the buttons on the left to select either the Market Messages, Scenario Variants, or the Data Items. The complete list of results can be seen at the bottom of this page, or you can use the search options to narrow down the results. You can search for EMAR Id's, Legacy Id's, the name of the item, or the source / target - partial searches are also permitted."
            >
              <HelpOutlineIcon className={styles.helpIcon} />
            </Tooltip>
          </div>
          <form className={styles.searchBox}>
            <TextField
              id="outlined-basic"
              label={`${searchType.name} Search`}
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
          {searchType.name !== "Data Items" ? (
            <div className={styles.filterContainer}>
              <GlobalDropDown
                label="Filter the Source:"
                labelValue="sourceNameValue"
                labelKey="sourceNameTitle"
                searchType={searchType.name}
                value={source}
                items={sourceOptions}
                handleChange={handleSourceChange}
              />
              <GlobalDropDown
                label="Filter the Target:"
                labelValue="targetNameValue"
                labelKey="targetNameValue"
                searchType={searchType.name}
                value={target}
                items={targetOptions}
                handleChange={handleTargetChange}
              />
            </div>
          ) : (
            <div className={styles.spaceContainer}></div>
          )}
        </div>
        {isSearchValuePresent ? (
          <div className={styles.errorContainer}>
            <span className={styles.errorMessage}>
              {searchType.name} Search field
            </span>
            <span> cannot be blank</span>
          </div>
        ) : null}
        <div className={`${styles.searchResults}`}>
          <ResultsTable
            data={data}
            setStartVal={setStartVal}
            headers={headers}
            baseLink={`/dataspec/${latestRecVersion}/${pathName}`}
            searchType={searchType.name}
            searchValue={searchValue}
            fetchData={fetchData}
            hasMore={hasMore}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default DataSpecSearchPage;

export async function getServerSideProps(context) {
  //Logic App: getDataSpecSearchList-LogicApp
  //TO-DO: change 3.5.0 to versionNumber when dropdown for the version selection will be implemented
  const latestRecVersion = "3.5.0";
  const dataSpecReq = await fetch(
    `https://prod-00.uksouth.logic.azure.com/workflows/d0c53a8711d9426d8f0a400b24e9a305/triggers/request/paths/invoke/versionNumber/${latestRecVersion}?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=skIfVKyKRwy-wAiTWKFjg3Q6vXwYK8ct2mQ8aSbB6Fk`
  );
  const dataSpecSearchListJSON = await dataSpecReq.json();

  const dataSpecSearchList = dataSpecSearchListJSON.mmsv;

  return {
    props: {
      dataSpecSearchList,
    },
  };
}
