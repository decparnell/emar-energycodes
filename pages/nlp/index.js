import styles from "../../styles/nlp.module.css";
import Head from "next/head";
import React, { useState } from "react";
import { BiBot } from "react-icons/bi";
import ChatBox from "../../components/nlp/chatBox";
import QuestionBox from "../../components/nlp/questionBox";

function NLP() {
  const DUMMY_ANSWERS = [
    "This is the answer to your question",
    "You can find additional information on the faq page on our website",
    "I don't quite understand your question, please try asking it again",
    "Sure I can help you! Here is some more information",
  ];

  const [messageResponse, setMessageResonse] = useState([]);
  const [randomAnswer, setRandomQuestion] = useState(0);

  const questionHandler = (userQuestion) => {
    
    //get a random response and put it into the variable botResponse
    const generateRandomAnswer = () => {
      const randomAnswer = Math.floor(Math.random() * DUMMY_ANSWERS.length);
      setRandomQuestion(randomAnswer);
    };
    const botResponse = DUMMY_ANSWERS[randomAnswer];

    setMessageResonse((prevQuestionAnswer) => {
      return [
        ...prevQuestionAnswer,
        {
          question: userQuestion,
          answer: botResponse,
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
