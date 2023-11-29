export default function handler(req, res) {
  // Get data submitted in request's body.

  const { queryId, rating, feedback } = req.body;

  const currentdate = new Date().toISOString();
  const currentdateIso = currentdate.substring(0, currentdate.indexOf("T"));
  const data = {
    query_date: currentdateIso,
    query_id: queryId,
    user_rating: rating,
    user_feedback: feedback,
  };
  const bodyData = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };
  return fetch(
    `https://recco-openai-qa-acs-2.azurewebsites.net/api/add_feedback?code=xM0K9AzuufqJipythY-unSJO_aWPZQ9MExOC-zbmH7f_AzFuWZhhsQ==`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching version Mapping:", error);
    });
}
