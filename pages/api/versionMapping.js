export default function handler(req, res) {
  // Get data submitted in request's body.

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=20000, stale-while-revalidate=59"
  );
  const { recVersion } = req.body;
  return fetch(
    `https://prod-15.uksouth.logic.azure.com/workflows/82a99e91c7b8468bb1eda20842ec26c1/triggers/manual/paths/invoke/recVersion/${recVersion}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UdfTkCt6-fScMlY692_H3A_3RwfuGkHN0GmEzIrwots`
  )
    .then((response) => response.json())
    .then((data) => {
      const versionMapping = data.versionMapping;
      res.json(versionMapping);
    })
    .catch((error) => {
      console.error("Error fetching version Mapping:", error);
    });
}
