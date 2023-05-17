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

function DataSpecSearchPage() {
  const [data, setData] = useState([]);
  const [source, setSource] = useState("-");
  const [target, setTarget] = useState("-");
  const [startVal, setStartVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState({ name: "Market Messages" });
  const headers =
    searchType.name === "Market Messages"
      ? marketMessageHeaders
      : searchType.name === "Scenario Variants"
      ? scenarioVariantHeaders
      : dataItemHeaders;
  const dropdownItems = [
    {
      title: "Half Hourly Data Collector",
      value: "Half Hourly Data Collector",
    },
  ];
  ///////////////FUNCTIONS/////////////////////////
  //fetch data for the results table (before an actual search has been done)
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://prod-17.uksouth.logic.azure.com/workflows/f977e7f523164a488ec1500b8d81a7cd/triggers/manual/paths/invoke/searchType/${searchType.name}/startVal/${startVal}/source/${source}/target/${target}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gRmq-WU9sVpROu8kyaVtadjAtqEm4HfILr_kGqNMZPU`
      );
      const dataSpecDataJson = await response.json();
      const newData = dataSpecDataJson.Table1;
      if (startVal === 0) {
        setData(newData);
      } else {
        setData((prevData) => [...prevData, ...newData]);
      }

      setStartVal((prevVal) => prevVal + 51);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchType]);

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
  const handleClick = (type) => {
    //refreshData();
    setStartVal(0);
    setData([]);
    handleScrollToTop();
    setSearchType(type);
  };

  const handleChange = (event) => {
    // refreshData();
    setSource(event.target.value);
    //fetchData();
  };

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
          stateSet={handleClick}
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
          <div className={styles.filterContainer}>
            <GlobalDropDown
              label="Filter the Source:"
              value={source}
              items={dropdownItems}
              handleChange={handleChange}
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
          />
        </div>
      </div>
    </div>
  );
}

export default DataSpecSearchPage;