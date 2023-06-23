export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;
  const data = { query: body.query };
  const bodyData = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };

  fetch(
    "https://recco-openai-qa.azurewebsites.net/api/query_gpt?code=bMm0xwEqnfU3M6LeN__Xid8PWpJwre2TtAdHqTv47xbpAzFuP75RDw==",
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
