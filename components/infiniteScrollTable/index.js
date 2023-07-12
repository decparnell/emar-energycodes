import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/infiniteScrollTable.module.css";
const ResultsTable = (props) => {
  /////// PROPS
  //array of length 2 [data to be displayed, function to set data variable]
  let data = props.data;
  //array of header objects with 2 properties:title & dataColumn
  /* headers = [
    { title: "Identifier", dataColumn: "EnergyMarketMessageIdentifier" },
    { title: "Local Reference", dataColumn: "LegacyIdentifier" },
    { title: "Message Name", dataColumn: "Label" },
  ]; */
  const headers = props.headers;
  //base link for making the table clickable through to other pages ( first column of the headers will be appended to create the link.)
  const baseLink = props.baseLink;
  //the api address to call to get the next batch of data
  const fetchData = props.fetchData;

  // has more data on the props.data - required for the infinite scroll
  const hasMore = props.hasMore;
  // isloading - is the fetchData still executing the api
  const isLoading = props.isLoading;

  function returnTableDataForHeaders(item) {
    let jsxArray = [];
    headers.map((row) => {
      jsxArray.push(<td key={row.title}>{item[row.dataColumn]}</td>);
    });
    return jsxArray;
  }
  
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={data.length === 0 && !isLoading ? <p>No data available.</p> : <p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
      className={styles.scroll}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((head, index) => {
              return <th key={index}>{head.title}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            if (typeof baseLink !== "undefined") {
              return (
                <Link
                  key={index}
                  href={`${baseLink}/${item[headers[0].dataColumn]}`}
                >
                  <tr>{returnTableDataForHeaders(item)}</tr>
                </Link>
              );
            } else {
              return <tr key={index}>{returnTableDataForHeaders(item)}</tr>;
            }
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default ResultsTable;
