export default function handler(req, res) {
  // Get data submitted in request's body.

  const body = req.body;

  const query = body.query;
  const queryTimestamp = body.timestamp;

  const data = {
    query: query,
    api_params: {
      engine: "gpt-35-turbo-0301",
      temperature: 0.1,
      max_tokens: 500,
    },
    logging: {
      user_name: "user@example.com",
      timestamp: queryTimestamp,
    },
  };

  const bodyData = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };

  fetch(
    "https://recco-openai-qa.azurewebsites.net/api/answer_query?code=WVTZzRNJ3Hi2fH_tKF3hHiXJsirhpa8qQATso6LFTqIOAzFuFICWGQ==",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Session data:", data);
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
}
