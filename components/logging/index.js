export const LogUserInfo = (action) => {
  const options = {
    body: `'{"action":"${action}"}'`,
  };
  fetch("/api/session", options)
    .then((response) => response.json())
    .then((data) => {
      console.log("Session data:", data);
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
};
