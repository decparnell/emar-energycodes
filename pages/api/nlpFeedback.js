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
    `https://recco-openai-qa-prod.azurewebsites.net/api/add_feedback?code=nx3BpiVqPWSYrHOjVg_OycwX7XdwUzhls33LFNjcb0FmAzFupuPDFA==`,
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
