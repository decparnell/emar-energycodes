export default function handler(req, res) {
  // Get data submitted in request's body.

  const body = req.body;
  //console.log(body);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
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
