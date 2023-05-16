export function checkIfsearchResultsAvailable (searchResults) {
    //checks whether all the required item are within searchResults
    let apiVarList = [];
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

    return apiVarList;
}