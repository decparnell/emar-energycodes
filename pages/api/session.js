// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// pages/api/session.js     `https://prod-12.uksouth.logic.azure.com/workflows/a01770cba8f44c8a90274a6faa24955d/triggers/manual/paths/invoke/email/${req.session.user.name_id}/action/${actionName}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vm5xuq9xqyj6xN0P_NBrRPjDsElEJhOsWIWcmjfdzak`

export default function handler(req, res) {
  //add page name
  const { actionName } = req.body;
  const userName = req.session.user.name_id;
  const data = {
    user: userName,
    action: actionName,
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
    `https://prod-12.uksouth.logic.azure.com:443/workflows/a01770cba8f44c8a90274a6faa24955d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vm5xuq9xqyj6xN0P_NBrRPjDsElEJhOsWIWcmjfdzak`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
}
