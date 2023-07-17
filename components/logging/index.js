export function LogUserInfo(action) {
  const data = { actionName: action };
  console.log("action:", action);
  const bodyData = JSON.stringify(data);
  console.log("bodyData:", bodyData);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };
  console.log("options:", options);

  fetch("/api/session", options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Logging Data:", data);
    })
    .catch((error) => {
      console.error("Error logging Data:", error);
    });
}
