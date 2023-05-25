export function LogUserInfo(action) {
  fetch(
    `https://prod-12.uksouth.logic.azure.com/workflows/a01770cba8f44c8a90274a6faa24955d/triggers/manual/paths/invoke/email/${req.session.user.name_id}/action/${action}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vm5xuq9xqyj6xN0P_NBrRPjDsElEJhOsWIWcmjfdzak`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Session data:", data);
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
}
