import styles from "../../styles/nlp.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import QuestionBox from "../../components/nlp/questionBox";
import ChatBox from "../../components/nlp/chatBox";
import UserQuestion from "../../components/nlp/userQuestion";
import BotResponse from "../../components/nlp/botResponse";
import QuestionHistory from "../../components/nlp/questionHistory";
import { v4 as uuidv4 } from "uuid";
import { uiVersion } from "../../components/settings";

function NLP() {
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [userQuestionHistory, setQuestionHistory] = useState([]);
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
                messageValue="An error occurred, please try again later"
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
        const botSentiment = data.status.answer_completness;
        const response = data.response;

        setChatLog((prevChat) => {
          return [
            ...prevChat,
            <BotResponse
              key={`${queryId}_BOT`}
              botSentiment={botSentiment}
              response={response}
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
  };

  useEffect(() => {
    chatLog.length > 0
      ? setQuestionHistory([
          ...new Map(
            chatLog
              .filter(function (el) {
                return el.key.includes("USER");
              })
              .map((item) => [item.props.messageValue, item])
          ).values(),
        ])
      : null;
  }, [chatLog]);

  return (
    <div className={styles.container}>
      <section className={`${styles.mainContentContainer}`}>
        <Head>
          <title>NLP</title>
          <meta property="og:title" content="NLP" key="nlp" />
        </Head>
        {chatLog.length > 0 && (
          <QuestionHistory
            questionHistory={userQuestionHistory}
            setQuery={setQuery}
          />
        )}
        <div className={`${styles.conversationContainer}`}>
          <div className={` box ${styles.chatBox}`}>
            <ChatBox isTyping={botIsTyping} chatLog={chatLog} />
          </div>
          <QuestionBox
            onAskQuestion={questionHandler}
            setQuery={setQuery}
            query={query}
            isTyping={botIsTyping}
          />
        </div>
      </section>
    </div>
  );
}

export default NLP;
