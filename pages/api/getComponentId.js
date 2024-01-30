import { encryptWithAES } from "../../components/helperFunctions/AES";

export default function handler(req, res) {
  // Get data submitted in request's body.
  const { captionText, documentName } = req.body;
  const data = { search: { text: captionText, documentName: documentName } };
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
    "https://recco-openai-qa-prod.azurewebsites.net/api/findComponentFromText?code=9hf2U9c76W0bYaMPlRrxXPBucs77iA6bLq3ioS2PCnb7AzFuVcv7fQ==",
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
