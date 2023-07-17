import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { TextField, Button } from "@mui/material";
function Test() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    console.log(query);
    const data = {
      query: query,
      timestamp: 1234,
    };
    const bodyData = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    };

    fetch("/api/testApi", options)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Error occurred while fetching session data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Session data:", data);
        setAnswer(data.response.answer);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
  };

  return (
    <>
      <Head>
        <title>Test</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label={`Search`}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            variant="outlined"
            size="small"
            fullWidth
          />

          <Button
            className={` green`}
            variant="contained"
            type="submit"
            value="submit"
          >
            Search
          </Button>
          <p>{answer}</p>
        </form>
      </div>
    </>
  );
}
//https://recco-openai-qa.azurewebsites.net/api/query_gpt?code=bMm0xwEqnfU3M6LeN__Xid8PWpJwre2TtAdHqTv47xbpAzFuP75RDw==
export default Test;
