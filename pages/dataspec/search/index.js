import styles from "../../../styles/dataSpecSearch.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";
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
import { LogUserInfo } from "../../components/logging";

function DataSpecSearchPage({ dataSpecSearchList }) {
  const [data, setData] = useState([]);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [startVal, setStartVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchType, setSearchType] = useState({ name: "Market Messages" });

  const headers =
    searchType.name === "Market Messages"
      ? marketMessageHeaders
      : searchType.name === "Scenario Variants"
      ? scenarioVariantHeaders
      : dataItemHeaders;

  const sourceOptions = getDistinctValuesSource(dataSpecSearchList);
  const targetOptions = getDistinctValuesTarget(dataSpecSearchList);

  ///////////////FUNCTIONS/////////////////////////
  //fetch data for the results table (before an actual search has been done)
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    const mappedSource = source === "" ? "-" : source;
    const mappedTarget = target === "" ? "-" : target;
    const mappedSearch = searchValue === "" ? "-" : searchValue;
    try {
      //Logic App: getAllDataSpecData-LogicApp-v2
      const response = await fetch(
        `https://prod-17.uksouth.logic.azure.com/workflows/f977e7f523164a488ec1500b8d81a7cd/triggers/manual/paths/invoke/searchType/${searchType.name}/startVal/${startVal}/source/${mappedSource}/target/${mappedTarget}/search/${mappedSearch}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gRmq-WU9sVpROu8kyaVtadjAtqEm4HfILr_kGqNMZPU`
      );
      const dataSpecDataJson = await response.json();
      const newData = dataSpecDataJson.Table1;

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
      }
    } catch (error) {
      setError(error);
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

  const refreshData = () => {
    setStartVal(0);
    setData([]);
    handleScrollToTop();
  };
  //handle click of search type buttons
  const handleSideNavClick = (type) => {
    refreshData();
    setSearchType(type);
  };

  const handleSourceChange = (e) => {
    refreshData();
    setSource(e.target.value);
  };

  const handleTargetChange = (e) => {
    refreshData();
    setTarget(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refreshData();
    fetchData();
  };

  useEffect(() => {
    LogUserInfo("Data Spec Search");
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
          <form className={styles.searchBox} onSubmit={handleSubmit}>
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
            >
              Search
            </Button>
          </form>
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
        </div>
        <div className={`${styles.searchResults}`}>
          <ResultsTable
            data={data}
            setStartVal={setStartVal}
            headers={headers}
            baseLink="/dataspec/3.3.0/marketmessage"
            searchType={searchType}
            fetchData={fetchData}
            hasMore={hasMore}
            isLoading={isLoading}
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

  const dataSpecReq = await fetch(
    `https://prod-00.uksouth.logic.azure.com/workflows/d0c53a8711d9426d8f0a400b24e9a305/triggers/request/paths/invoke/versionNumber/3.5.0?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=skIfVKyKRwy-wAiTWKFjg3Q6vXwYK8ct2mQ8aSbB6Fk`
  );
  const dataSpecSearchListJSON = await dataSpecReq.json();
  const dataSpecSearchList = dataSpecSearchListJSON.mmsv;
  return {
    props: {
      dataSpecSearchList,
    },
  };
}
