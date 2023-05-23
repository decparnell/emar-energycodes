const LogUserInfo = (user) => {
  got
    .get(
      `https://prod-12.uksouth.logic.azure.com/workflows/a01770cba8f44c8a90274a6faa24955d/triggers/manual/paths/invoke/email/${user}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vm5xuq9xqyj6xN0P_NBrRPjDsElEJhOsWIWcmjfdzak`
    )
    .then((res) => {})
    .catch((err) => {
      console.log("Error: ", err.message);
    });
};
