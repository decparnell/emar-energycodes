export const LogUserInfo = (props) => {
  const options = {
    method: "POST",
    body: `'{"action":"${props.action}"}'`,
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
