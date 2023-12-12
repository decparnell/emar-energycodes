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
    "https://recconlpcogsearch.azurewebsites.net/api/findComponentFromText?code=1dF7p3DsRDIbvBM-g40Vxhsp2T793SJdsC--k10YA3NfAzFuzLd5BQ==",
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
