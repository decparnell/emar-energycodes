import DataSpecSearch from "../../../components/dataspec/dataSpecSearch";
import styles from "../../../styles/home.module.css";
import Head from "next/head";
import { useState, useEffect } from "react";

import ResultsTable from "../../../components/infiniteScrollTable";
function DataSpecSearchPage() {
  const [searchType, setSearchType] = useState("mm");
  const [data, setData] = useState([]);
  const [startVal, setStartVal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiAddress = `https://prod-17.uksouth.logic.azure.com/workflows/f977e7f523164a488ec1500b8d81a7cd/triggers/manual/paths/invoke/searchType/${searchType}/startVal/${startVal}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gRmq-WU9sVpROu8kyaVtadjAtqEm4HfILr_kGqNMZPU`;
  //

  const headers =
    searchType === "mm"
      ? [
          { title: "Identifier", dataColumn: "EnergyMarketMessageIdentifier" },
          { title: "Local Reference", dataColumn: "LegacyIdentifier" },
          { title: "Message Name", dataColumn: "Label" },
        ]
      : searchType === "sv"
      ? [
          {
            title: "Identifier",
            dataColumn: "EnergyMarketMessageScenarioVariantIdentifier",
          },
          {
            title: "Scenario Variant Name",
            dataColumn: "EnergyMarketMessageScenarioVariantName",
          },
          { title: "Source", dataColumn: "SourceMarketDataServiceIdentifier" },
          { title: "Target", dataColumn: "TargetMarketDataServiceIdentifier" },
          { title: "Api Method", dataColumn: "ApiMethod" },
          { title: "Api Route", dataColumn: "ApiRoute" },
        ]
      : [
          { title: "Identifier", dataColumn: "DataItemIdentifier" },
          { title: "Local Reference", dataColumn: "LegacyIdentifier" },
          { title: "Message Name", dataColumn: "DataItemName" },
        ];

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://prod-17.uksouth.logic.azure.com/workflows/f977e7f523164a488ec1500b8d81a7cd/triggers/manual/paths/invoke/searchType/${searchType}/startVal/${startVal}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gRmq-WU9sVpROu8kyaVtadjAtqEm4HfILr_kGqNMZPU`
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

  const handleClick = (e, type) => {
    e.preventDefault();
    setSearchType(type);
    setStartVal(0);
    fetchData();
    console.log(searchType);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Data Specification Search</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <button onClick={(e) => handleClick(e, "mm")}>MM</button>
      <button onClick={(e) => handleClick(e, "sv")}>SV</button>
      <button onClick={(e) => handleClick(e, "di")}>DI</button>
      <ResultsTable
        data={data}
        setStartVal={setStartVal}
        headers={headers}
        baseLink="/dataspec/3.3.0/marketmessage"
        searchType={searchType}
        fetchData={fetchData}
        apiAddress={apiAddress}
      />
    </div>
  );
}

export default DataSpecSearchPage;
