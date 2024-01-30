import styles from "../../styles/nlp.module.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import QuestionBox from "../../components/nlp/questionBox";
import ChatBox from "../../components/nlp/chatBox";
import UserQuestion from "../../components/nlp/userQuestion";
import BotResponse from "../../components/nlp/botResponse_erin_develop";
import QuestionHistory from "../../components/nlp/questionHistory";
import { v4 as uuidv4 } from "uuid";
import { uiVersion, loadedDocuments } from "../../components/settings";
import { Modal } from "../../components/modal";
import { LogUserInfo } from "../../components/logging";
import {
  TipsModal,
  TipsExamples1Modal,
  TipsExamples2Modal,
  DocumentsModal,
} from "../../components/nlp/modals";

function NLP() {
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [userQuestionHistory, setQuestionHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [openDocumentsModal, setOpenDocumentsModal] = useState(false);
  const [closed, setClosed] = useState(false);
  const [shortQuery, setShortQuery] = useState(false);
  const [openTipsModal, setOpenTipsModal] = useState(false);
  const [openExampleQuestions1Modal, setExampleQuestions1Modal] =
    useState(false);
  const [openExampleQuestions2Modal, setExampleQuestions2Modal] =
    useState(false);

  useEffect(() => {
    LogUserInfo("VIEW: ERIN_DEVELOP");
  }, []);

  //handlers
  const closeModal = () => {
    setOpenTipsModal(false);
    setExampleQuestions1Modal(false);
    setExampleQuestions2Modal(false);
  };

  const tipsModalHandler = () => {
    closeModal();
    setOpenTipsModal(true);
  };

  const exampleQuestions1Handler = () => {
    closeModal();
    setExampleQuestions1Modal(true);
  };

  const exampleQuestions2Handler = () => {
    closeModal();
    setExampleQuestions2Modal(true);
  };
  const closeDocumentsModal = () => {
    setOpenDocumentsModal(false);
  };

  const documentsModalHandler = () => {
    setOpenDocumentsModal(true);
  };

  ////////////////

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
    fetch("/api/erin_develop", options)
      .then((response) => {
        if (!response.ok) {
          setChatLog((prevChat) => {
            return [
              ...prevChat,
              <BotResponse
                response=""
                messageValue="An error occurred, please try again later"
                key={`${queryId}_BOT_ERROR`}
                tipsModalHandler={tipsModalHandler}
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
        const response = data;
        console.log(response);
        setChatLog((prevChat) => {
          return [
            ...prevChat,
            <BotResponse
              key={`${queryId}_BOT`}
              botSentiment={botSentiment}
              response={response}
              queryId={queryId}
              tipsModalHandler={tipsModalHandler}
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
      <Head>
        <title>ERIN</title>
        <meta property="og:title" content="NLP" key="nlp" />
      </Head>
      <div className={styles.mainContentContainer}>
        {chatLog.length > 0 && (
          <QuestionHistory
            questionHistory={userQuestionHistory}
            setQuery={setQuery}
            closed={[closed, setClosed]}
          />
        )}
        <div className={`${styles.conversationContainer}`}>
          <div className={`box ${styles.chatBox}`}>
            <ChatBox
              isTyping={botIsTyping}
              chatLog={chatLog}
              tipsModalHandler={tipsModalHandler}
            />
          </div>
          <QuestionBox
            onAskQuestion={questionHandler}
            setQuery={setQuery}
            query={query}
            isTyping={botIsTyping}
            shortQuery={[shortQuery, setShortQuery]}
            tipsModalHandler={tipsModalHandler}
          />
        </div>
      </div>
      <p className={`${styles.disclaimerContainer}`}>
        DISCLAIMER: ERIN is a Natural Language Processing (NLP) tool available
        to support users in navigating and querying the REC. As with all NLP
        tools, there are limitations to their capability, as such users must
        ensure ERIN is used alongside the REC and not as a substitute. For the
        avoidance of doubt, REC Parties must continue to use the REC legal text
        as the basis for their obligations. Your questions, feedback and ERIN’s
        responses are logged by the Code Manager, so we can help ERIN get better
        at answering questions in the future. All the data hosted within ERIN is
        publicly available and the model will not ingest any information
        provided within questions for use in future responses. Nevertheless,
        users are not permitted to submit any personal information within
        questions. See the list of documents included in this model{" "}
        <a
          className={`${styles.documentsLink}`}
          onClick={documentsModalHandler}
        >
          here.
        </a>
      </p>
      {openDocumentsModal ? (
        <DocumentsModal closeDocumentsModal={closeDocumentsModal} />
      ) : null}
      {openTipsModal ? (
        <TipsModal
          closeModal={closeModal}
          exampleQuestions1Handler={exampleQuestions1Handler}
        />
      ) : null}
      {openExampleQuestions1Modal ? (
        <TipsExamples1Modal
          closeModal={closeModal}
          tipsModalHandler={tipsModalHandler}
          exampleQuestions2Handler={exampleQuestions2Handler}
        />
      ) : null}

      {openExampleQuestions2Modal ? (
        <TipsExamples2Modal
          closeModal={closeModal}
          exampleQuestions1Handler={exampleQuestions1Handler}
        />
      ) : null}
    </div>
  );
}

export default NLP;
