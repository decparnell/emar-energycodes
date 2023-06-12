export function LogUserInfo(action) {
  const data = { actionName: action };
  const body = JSON.stringify(data);
  console.log(
    "BODYBODYBODY#############################################",
    body
  );
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("/api/session", options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Session data:", data);
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
}
