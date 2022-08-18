// import styles from "../../styles/dataspec.module.css";
import { useState, useContext, useEffect } from "react";
import CodesSchedulesSearchForm from "./codesSchedulesSearchForm";
import createCSSearchResults from "./createCSSearchResults";
import AppContext from "../context/AppContext";
import Head from "next/head";
import SecondNavbar from "../layout/secondHeader";

function CodesSchedulesSearch(props) {
  const value = useContext(AppContext);
  const { latestScheduleVersion } = value.state;
  const [searchResults, setSearchResults] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  // const [sourceFilterValue, setSourceFilterValue] =
  //   useState("Filter the source:");

  // function handleButtonClick(newType, e) {
  //   e.preventDefault();
  //   setSearchType(newType);
  // }

  //   useEffect(() => {
  //     switchSearchResults(searchType);
  //   }, [searchType]);

  return (
    <div className="">
      <Head>
        <title>EMAR Data Specification</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div>
        <SecondNavbar />
        <h1 className="">Codes Schedules Search</h1>

        {CodesSchedulesSearchForm(
          setSearchResults,
          errorMessage,
          setErrorMessage
        )}
      </div>
      {searchResults
        ? createCSSearchResults(searchResults, errorMessage)
        : null}
    </div>
  );
}

export default CodesSchedulesSearch;
