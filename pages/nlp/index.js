import styles from "../../styles/nlp.module.css";
import Head from "next/head";
import React, { useState } from "react";
import QuestionBox from "../../components/nlp/questionBox";
import ChatBox from "../../components/nlp/chatBox";
import UserQuestion from "../../components/nlp/userQuestion";
import BotResponse from "../../components/nlp/botResponse";

function NLP() {
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  const questionHandler = async (userQuestion) => {

    setBotIsTyping(true);

    setChatLog((prevChat) => {
      return [
        ...prevChat, 
        <UserQuestion messageValue={userQuestion} />
      ];
    });

    const data = {
      query: userQuestion,
      api_params: {
        engine: "gpt-35-turbo-0301",
        temperature: 0.1,
        max_tokens: 500,
      },
      logging: {
        user_name: "user@example.com",
        timestamp: 1234,
      },
    };

    const bodyData = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    };

    fetch(
      "https://recco-openai-qa.azurewebsites.net/api/answer_query?code=WVTZzRNJ3Hi2fH_tKF3hHiXJsirhpa8qQATso6LFTqIOAzFuFICWGQ==",
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occurred while fetching session data");
        }
        return response.json();
      })
      .then((data) => {
        const botAnswer = data.response.answer;

        setChatLog((prevChat) => {
          return [
            ...prevChat, 
            <BotResponse messageValue={botAnswer} />
          ];
        });

        setBotIsTyping(false);
      })
      .catch((error) => {
        console.error("Error fetching session data:", error);
      });
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
          <div className={`${styles.chatBox} box`}>
            <ChatBox
              isTyping={botIsTyping}
              chatLog={chatLog}
            />
          </div>
        </section>
        <QuestionBox onAskQuestion={questionHandler} />
      </div>
    </>
  );
}

export default NLP;