export default function handler(req, res) {
  // Get data submitted in request's body.

  const body = req.body;

  const query = body.query;
  const queryTimestamp = body.timestamp;

  const data = {
    user_id: "user@example.com",
    query_timestamp: queryTimestamp,
    query_id: "1234",
    ui_version: "1.0.0",
    query: query,
    api_params: {
      engine: "gpt-35-turbo-0301",
      temperature: 0.1,
      max_tokens: 500,
    },
  };
  console.log("query:", query);
  console.log("queryTimestamp:", queryTimestamp);
  const bodyData = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };
  console.log("options:", options);
  fetch(
    "https://recco-openai-qa.azurewebsites.net/api/answer_query?code=WVTZzRNJ3Hi2fH_tKF3hHiXJsirhpa8qQATso6LFTqIOAzFuFICWGQ==",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("NLP Response:", data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching NLP response:", error);
    });
}