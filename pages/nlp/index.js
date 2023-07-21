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
  const [isCurrentQuestion, setIsCurrentQuestion] = useState();
  const [userQuestion, setUserQuestion] = useState("");
  const [previousQuestion, setPreviousQuestion] = useState("");

  const fetchData = (queryId) => {
    //dec change to add query to reduce dupe
    var query = "";
    if (isCurrentQuestion === true) {
      //Asked question data
      query = userQuestion;
    } else if (isCurrentQuestion === false) {
      //Previously asked question data
      query = previousQuestion;
    }

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

        setChatLog((prevChat) => {
          return [
            ...prevChat,
            <BotResponse messageValue={botAnswer} key={`${queryId}_BOT`} />,
          ];
        });

        setBotIsTyping(false);
      })
      .catch((error) => {
        setBotIsTyping(false);
        console.error("Error fetching session data:", error);
      });
  };
  /////////////////////////dec comments:THIS BIT IS GOOD - just added keys & moved query id down to here to avoid dupe and to give continuity
  const questionHandler = async (userQuestion) => {
    //Storing queryid & user
    const queryId = uuidv4();
    setBotIsTyping(true);
    setIsCurrentQuestion(true);
    setUserQuestion(userQuestion);

    setChatLog((prevChat) => {
      return [
        ...prevChat,
        <UserQuestion messageValue={userQuestion} key={`${queryId}_USER`} />,
      ];
    });
    console.log(chatLog);
    /////////////////////////dec comments: Dont get why we need state arrays for the history and the chat log, this can be infered from the chat log
    setQuestionHistory((prevQuestion) => {
      return [
        ...prevQuestion,
        <QuestionHistoryItem
          messageValue={userQuestion}
          onAskQuestionFromHistory={questionHistoryItemHandler}
          key={`${queryId}_PREV`}
        />,
      ];
    });

    console.log(questionHistory);
    fetchData(queryId);
  };

  const questionHistoryItemHandler = (previousQuestion) => {
    setBotIsTyping(true);
    setIsCurrentQuestion(false);
    setPreviousQuestion(previousQuestion);

    setChatLog((prevChat) => {
      return [
        ...prevChat,
        <UserQuestion messageValue={previousQuestion} key={123} />,
      ];
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
