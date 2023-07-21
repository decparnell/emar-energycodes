import styles from "../../styles/nlp.module.css";
import Head from "next/head";
import React, { useState } from "react";
import QuestionBox from "../../components/nlp/questionBox";
import ChatBox from "../../components/nlp/chatBox";
import UserQuestion from "../../components/nlp/userQuestion";
import BotResponse from "../../components/nlp/botResponse";
import QuestionHistory from "../../components/nlp/questionHistory";
import QuestionHistoryItem from "../../components/nlp/questionHistoryItem";
import { v4 as uuidv4 } from "uuid";
import { uiVersion } from "../../components/settings";
function NLP() {
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isCurrentQuestion, setIsCurrentQuestion] = useState(true);
  const [query, setQuery] = useState("");

  const fetchData = async (queryId) => {
    const data = {
      query: query,
      queryTimestamp: new Date(Date.now()).toISOString(),
      queryId: queryId,
      uiVersion: uiVersion,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    ////////////////////////////////////dec comments:THIS BIT IS GOOD - just added keys
    fetch("/api/nlpSession", options)
      .then((response) => {
        if (!response.ok) {
          setChatLog((prevChat) => {
            return [
              ...prevChat,
              <BotResponse
                messageValue={"An error occurred, please try again later"}
                key={`${queryId}_BOT_ERROR`}
              />,
            ];
          });

          setBotIsTyping(false);
          throw new Error("Error occurred while fetching session data");
        }
        return response.json();
      })
      .then((data) => {
        const botAnswer = data.response.answer;
        const botSentiment = data.status;
        setChatLog((prevChat) => {
          return [
            ...prevChat,
            <BotResponse
              messageValue={botAnswer}
              key={`${queryId}_BOT`}
              botSentiment={botSentiment}
            />,
          ];
        });

        setBotIsTyping(false);
      })
      .catch((error) => {
        setBotIsTyping(false);
        console.error("Error fetching session data:", error);
      });

    setQuery("");
  };
  /////////////////////////dec comments:THIS BIT IS GOOD - just added keys & moved query id down to here to avoid dupe and to give continuity
  const questionHandler = () => {
    //Storing queryid & user
    const queryId = uuidv4();
    setChatLog((prevChat) => {
      return [
        ...prevChat,
        <UserQuestion messageValue={query} key={`${queryId}_USER`} />,
      ];
    });
    setBotIsTyping(true);

    fetchData(queryId);

    // setIsCurrentQuestion(true);
  };

  return (
    <>
      <Head>
        <title>NLP</title>
        <meta property="og:title" content="NLP" key="nlp" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>NLP</h1>
        <section className={`${styles.mainContentContainer} `}>
          {chatLog.length > 0 && (
            <QuestionHistory
              chatLog={chatLog}
              questionHistory={questionHistory}
              setQuery={setQuery}
            />
          )}
          <div className={`${styles.conversationContainer} `}>
            <div className={`${styles.chatBox} box`}>
              <ChatBox isTyping={botIsTyping} chatLog={chatLog} />
            </div>
            <QuestionBox
              onAskQuestion={questionHandler}
              setQuery={setQuery}
              query={query}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default NLP;
