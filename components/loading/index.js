import Router from "next/router";
import { useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import { fetchRecVersions } from "../helperFunctions/versioning";

export default function Loading() {
  //appcontext variables
  const value = useContext(AppContext);
  let { latestDataSpecVersion, loading } = value.state;

  useEffect(() => {
    const handleStart = (url) =>
      url !== Router.asPath && value.setLoading(true);
    const handleComplete = (url) =>
      url == Router.asPath && value.setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [Router]);

  //TO-DO: performance improvement, fetchRecVersions should be triggered only certain type of page are being invoked
  /*   useEffect(() => {
    fetchRecVersions();
  }, [loading]); */

  return (
    loading && (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    )
  );
}
