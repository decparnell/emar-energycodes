import { encryptWithAES } from "../../components/helperFunctions/AES";

export default function handler(req, res) {
  // Get data submitted in request's body.
  const { query, queryTimestamp, queryId, uiVersion } = req.body;
  const data = {
    query: query,
    api_params: {
      temperature: 0.1,
      max_tokens: 1000,
    },
    user_id: encryptWithAES("req.session.user.name_id"),
    query_timestamp: queryTimestamp,
    query_id: queryId,
    ui_version: uiVersion,
    embeddings: "all_embeddings_3_August",
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
    "https://recco-openai-qa.azurewebsites.net/api/answer_query?code=WVTZzRNJ3Hi2fH_tKF3hHiXJsirhpa8qQATso6LFTqIOAzFuFICWGQ==",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching NLP response:", error);
    });
}
