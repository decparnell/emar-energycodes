export function LogUserInfo(action) {
  const data = { actionName: action };
  const bodyData = JSON.stringify(data);
  console.log(
    "BODYBODYBODY#############################################",
    bodyData
  );
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };
  console.log("options''''''''''", options);
  fetch("/api/session", options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Session data:", data);
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
}
