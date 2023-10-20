import { encryptWithAES } from "../../components/helperFunctions/AES";

export default function handler(req, res) {
  const { actionName, queryId } = req.body;
  const userName = encryptWithAES(req.session.user.name_id);
  const query_id = queryId ? queryId : "";
  const data = {
    userid: userName,
    action: actionName,
    sessionId: "",
    queryId: query_id,
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
    `https://digitalnavigatorloguseractivity.azurewebsites.net/api/logUserActivity?code=hbDDxd6_TtaihwECiKfzd7wQUYNmqXJogNTSb4nBn7XCAzFuk1QF_g==`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching Session Data:", error);
    });
}
