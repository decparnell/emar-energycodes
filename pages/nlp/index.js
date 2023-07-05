import styles from "../../styles/nlp.module.css";
import Head from "next/head";
import React, { useState } from "react";
import { BiBot } from "react-icons/bi";
import ChatBox from "../../components/nlp/chatBox";
import QuestionBox from "../../components/nlp/questionBox";

function NLP() {
  const [messageResponse, setMessageResonse] = useState([]);

  const botIcon = (
    <BiBot
      style={{
        height: "4%",
        width: "4%",
        color: "green",
        paddingBottom: "0.5%",
      }}
    />
  );

  const questionHandler = (messageContent) => {
    setMessageResonse((prevMessageResponse) => {
      return [
        ...prevMessageResponse,
        {
          content: messageContent,
          id: Math.round(Math.random() * 100).toString(),
        },
      ];
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
            <ChatBox messageResponse={messageResponse} />
          </div>
        </section>
        <QuestionBox onAskQuestion={questionHandler} />
      </div>
    </>
  );
}

export default NLP;
