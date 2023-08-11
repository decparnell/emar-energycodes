export const callFeedback = (queryId, rating, feedback) => {
  const data = { queryId: queryId, rating: rating, feedback: feedback };
  const bodyData = JSON.stringify(data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  };
  fetch("/api/nlpFeedback", options)
    .then((response) => response.json())
    .then((data) => {
      //console.log("Logging Data:", data);
    })
    .catch((error) => {
      console.error("Error logging Data:", error);
    });
};
