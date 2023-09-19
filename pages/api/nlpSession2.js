import { encryptWithAES } from "../../components/helperFunctions/AES";

export default function handler(req, res) {
  // Get data submitted in request's body.
  const { query } = req.body;
  const data = {
    query: query,
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
    //"https://recco-openai-qa-prod.azurewebsites.net/api/answer_query?code=ioDCQKvxuvlEraJnocB1GQIIpK9dJI99kqsxDB8q4oUNAzFu3ussZw==",
    "https://recconlpcogsearch.azurewebsites.net/api/answer_query?code=psAPggtHpafMGciDC3Gjofz8lDzJbBmRdnXvUvO8g6AqAzFu3k2KOw==",
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
