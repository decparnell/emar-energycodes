export function LogUserInfo(action) {
  const options = {
    method: "POST",
    body: { action: "HOMEPAGE" },
    headers: { "Content-type": "application/json" },
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
