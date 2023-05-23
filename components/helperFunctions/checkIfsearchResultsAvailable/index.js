export function checkIfsearchResultsAvailable(searchResults, pageId) {
  let apiVarList = [];
  if (pageId === "MarketMessagePage") {
    //checks whether all the required item are within searchResults
    if (searchResults) {
      apiVarList = [
        {
          obj: searchResults,
          name: "searchResults",
        },
        { obj: searchResults[0], name: "marketMessageInfo" },
        { obj: searchResults[1], name: "svForMarketMessage" },
        { obj: searchResults[2], name: "dataItems" },
      ];
    } else {
      apiVarList = [
        {
          obj: searchResults,
          name: "searchResults",
        },
      ];
    }
  } else if (pageId === "DataItemDetailsPage") {
    //checks whether all the required item are within searchResults
    if (searchResults) {
      apiVarList = [
        {
          obj: searchResults,
          name: "searchResults"
        },
        { obj: searchResults[0], name: "dataItemInfo" },
        { obj: searchResults[1], name: "mmForDataItem" },
        { obj: searchResults[2], name: "dataEnumerations" }
      ];
    } else {
      apiVarList = [
        {
          obj: searchResults,
          name: "searchResults"
        }
      ];
    }
  }

  return apiVarList;
}