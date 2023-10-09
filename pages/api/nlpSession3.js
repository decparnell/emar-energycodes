import { encryptWithAES } from "../../components/helperFunctions/AES";

export default function handler(req, res) {
  // Get data submitted in request's body.
  const { query, queryTimestamp, queryId, uiVersion } = req.body;
  const data = {
    query: query,
    user_id: encryptWithAES(req.session.user.name_id),
    query_timestamp: queryTimestamp,
    query_id: queryId,
    ui_version: uiVersion,
  };
  const bodyData = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };
  //test
  return fetch(
    //prod"https://recco-openai-qa-prod.azurewebsites.net/api/answer_query?code=ioDCQKvxuvlEraJnocB1GQIIpK9dJI99kqsxDB8q4oUNAzFu3ussZw==",
    //dev 1"https://recco-openai-qa.azurewebsites.net/api/answer_query?code=WVTZzRNJ3Hi2fH_tKF3hHiXJsirhpa8qQATso6LFTqIOAzFuFICWGQ==",
    //dev cs"https://recconlpcogsearch.azurewebsites.net/api/answer_query?code=psAPggtHpafMGciDC3Gjofz8lDzJbBmRdnXvUvO8g6AqAzFu3k2KOw==",
    //devcsbl
    "https://recco-openai-qa-acs.azurewebsites.net/api/answer_query?code=za0749-5WI1jBgRnt1QQOo_cVdRhLugFSxncOzpzRdFuAzFuvINnXw==",
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
