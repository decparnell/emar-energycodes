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
import Modal from "../../components/modal";
import { LogUserInfo } from "../../components/logging";

function NLP() {
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [userQuestionHistory, setQuestionHistory] = useState([]);
  const [query, setQuery] = useState("");
  const [openDocumentsModal, setOpenDocumentsModal] = useState(false);
  const [closed, setClosed] = useState(false);

  const fetchData = async (queryId) => {
    const data = {
      query: query,
      queryTimestamp: new Date(Date.now()).toISOString(),
      queryId: queryId,
      uiVersion: uiVersion,
    };

    /* LogUserInfo("NLP_COGNITIVE---", String(queryId), ": ", String(query)); */
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
        const response = data;

        setChatLog((prevChat) => {
          return [
            ...prevChat,
            <BotResponse
              key={`${queryId}_BOT`}
              botSentiment={botSentiment}
              response={response}
              queryId={queryId}
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
    LogUserInfo("NLP_COGNITIVE---", String(queryId), ": ", String(query));
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

  const closeDocumentsModal = () => {
    setOpenDocumentsModal(false);
  };

  const documentsModalHandler = () => {
    setOpenDocumentsModal(true);
  };

  const documents = loadedDocuments.map((document, index) => {
    return (
      <li key={index}>
        <p className={`${styles.p} `}>
          <b>{document.documentType}</b> - {document.documentTitle}
        </p>
      </li>
    );
  });

  const documentsList = (
    <ul style={{ listStyle: "disc", margin: 0 }}>{documents}</ul>
  );

  const documentsModal = (
    <Modal open={openDocumentsModal} onClose={closeDocumentsModal}>
      <div className={`${styles.exampleImagesMessage}`}>
        <p>Below is a list of the documents that are included in this model</p>
      </div>
      <div className={`${styles.documentsContainer}`}>{documentsList}</div>
    </Modal>
  );

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
            <ChatBox isTyping={botIsTyping} chatLog={chatLog} />
          </div>
          <QuestionBox
            onAskQuestion={questionHandler}
            setQuery={setQuery}
            query={query}
            isTyping={botIsTyping}
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
      {documentsModal}
    </div>
  );
}

export default NLP;
