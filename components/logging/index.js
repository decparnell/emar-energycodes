export function LogUserInfo(action) {
  const data = { action: action };
  const body = JSON.stringify(data);
  console.log(body);
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
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
