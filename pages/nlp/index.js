import styles from "../../styles/nlp.module.css";
import Head from "next/head";
import React, { useState } from "react";
import QuestionBox from "../../components/nlp/questionBox";
import ChatBox from "../../components/nlp/chatBox";
import UserQuestion from "../../components/nlp/userQuestion";
import BotResponse from "../../components/nlp/botResponse";
import QuestionHistory from "../../components/nlp/questionHistory";
import QuestionHistoryItem from "../../components/nlp/questionHistoryItem";

function NLP() {
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [isCurrentQuestion, setIsCurrentQuestion] = useState();
  const [userQuestion, setUserQuestion] = useState("");
  const [previousQuestion, setPreviousQuestion] = useState("");

  const fetchData = () => {
    if (isCurrentQuestion === true) {
      //Storing queryid & user
      const queryId = uuidv4();
      //Asked question data
      const data = {
        query: userQuestion,
        queryTimestamp: new Date(Date.now()).toISOString(),
        queryId: queryId,
        uiVersion: uiVersion,
      };
    } else if (isCurrentQuestion === false) {
      //Storing queryid & user
      const queryId = uuidv4();
      //Previously asked question data
      const data = {
        query: previousQuestion,
        queryTimestamp: new Date(Date.now()).toISOString(),
        queryId: queryId,
        uiVersion: uiVersion,
      };
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/nlpSession", options)
      .then((response) => {
        if (!response.ok) {
          setChatLog((prevChat) => {
            return [
              ...prevChat,
              <BotResponse
                messageValue={"An error occurred, please try again later"}
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

        setChatLog((prevChat) => {
          return [...prevChat, <BotResponse messageValue={botAnswer} />];
        });

        setBotIsTyping(false);
      })
      .catch((error) => {
        setBotIsTyping(false);
        console.error("Error fetching session data:", error);
      });
  };

  const questionHandler = async (userQuestion) => {
    setBotIsTyping(true);
    setIsCurrentQuestion(true);
    setUserQuestion(userQuestion);

    setChatLog((prevChat) => {
      return [...prevChat, <UserQuestion messageValue={userQuestion} />];
    });

    setQuestionHistory((prevQuestion) => {
      return [
        ...prevQuestion,
        <QuestionHistoryItem
          messageValue={userQuestion}
          onAskQuestionFromHistory={questionHistoryItemHandler}
        />,
      ];
    });

    fetchData();
  };

  const questionHistoryItemHandler = (previousQuestion) => {
    setBotIsTyping(true);
    setIsCurrentQuestion(false);
    setPreviousQuestion(previousQuestion);

    setChatLog((prevChat) => {
      return [...prevChat, <UserQuestion messageValue={previousQuestion} />];
    });

    fetchData();
  };

  const showQuestionHistory = questionHistory.length > 0 && (
    <QuestionHistory questionHistory={questionHistory} />
  );

  return (
    <>
      <Head>
        <title>NLP</title>
        <meta property="og:title" content="NLP" key="nlp" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>NLP</h1>
        <section className={`${styles.mainContentContainer} `}>
          {showQuestionHistory}
          <div className={`${styles.conversationContainer} `}>
            <div className={`${styles.chatBox} box`}>
              <ChatBox isTyping={botIsTyping} chatLog={chatLog} />
            </div>
            <QuestionBox onAskQuestion={questionHandler} />
          </div>
        </section>
      </div>
    </>
  );
}

export default NLP;
