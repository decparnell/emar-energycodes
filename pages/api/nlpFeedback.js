export default function handler(req, res) {
  // Get data submitted in request's body.

  const { queryDate, queryId, rating, feedback } = req.body;

  const data = {
    query_date: queryDate,
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
    `https://recco-openai-qa.azurewebsites.net/api/add_feedback?code=4DSgO5B-PIfQiK2bA9H6CjoQlzcd4myCq8-GjZWeHYHkAzFurEiw3A==`,
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
