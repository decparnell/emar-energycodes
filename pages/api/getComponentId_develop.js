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
    "https://recco-openai-qa-acs-2.azurewebsites.net/api/findComponentFromText?code=zVzciuT5s_mH0ltUOGC2P3xsSlMaXWbIfeEIsDj5RD9PAzFuhftJ5g==",
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
