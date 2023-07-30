export default function handler(req, res) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20000, stale-while-revalidate=59"
  );
  // Get data submitted in request's body.y;
  return fetch(
    "https://prod-07.uksouth.logic.azure.com:443/workflows/8920bdcc74c94f6fa6a7b157b83f933a/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=Bz5tW3QlJj53K4zrqYFw3h6cPg8-A62iRqIN_Q9ktWY"
  )
    .then((response) => response.json())
    .then((data) => {
      const recVersions = data.RecVersions;
      res.json(recVersions);
    })
    .catch((error) => {
      console.error("Error fetching RecVersions:", error);
    });
}
