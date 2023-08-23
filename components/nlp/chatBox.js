import React, { useState, useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { BiSupport } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import Modal from "../modal/index.js";
import Image from "next/image";
import image1 from "../../public/ExampleQuestions1.jpeg";
import image2 from "../../public/ExampleQuestions2.jpeg";


function ChatBox(props) {
  const botIcon = <BiSupport className={`${styles.botIcon}`} />;

  const typingBotIcon = <BiSupport className={`${styles.typingBotIcon}`} />;

  const [showComponent, setShowComponent] = useState(false);
  const [openTipsModal, setOpenTipsModal] = useState(false);
  const [openExampleQuestions1Modal, setExampleQuestions1Modal] =
    useState(false);
  const [openExampleQuestions2Modal, setExampleQuestions2Modal] =
    useState(false);

  useEffect(() => {
    setInterval(() => {
      setShowComponent(true);
    }, 2000);
  }, []);

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

  const botPrompt = (
    <div className={`${styles.botResponse}`}>
      {botIcon}
      <p className={`${styles.chatMessage}`}>
        Hi! I am ERIN, the new REC knowledge-based tool that can help you
        explore and query the REC. I’ll also give you links to REC documents to
        give you further detail. If you want any tips on how to ask the best
        questions, click{"  "}
        <a className={`${styles.link}`} onClick={tipsModalHandler}>
          here.
        </a>
      </p>
    </div>
  );

  const typingDots = (
    <div className={`${styles.typingRow}`}>
      {typingBotIcon}
      <div className={`${styles.dotsContainer}`}>
        <div className={`${styles.dotsTyping}`}></div>
      </div>
    </div>
  );

  const tipsModal = (
    <Modal open={openTipsModal} onClose={closeModal}>
      <div className={`${styles.tipsMessage}`}>
        <p>
          Hi! I’ve put together some helpful hints when asking me questions. If
          you would also like to see some examples, click{" "}
          <a className={`${styles.link}`} onClick={exampleQuestions1Handler}>
            here
          </a>
          .
        </p>
      </div>
      <div className={`${styles.tips}`}>
        <div className={`${styles.doBox}`}>
          <div className={`${styles.doCircle}`}>Do</div>
          <ul>
            <li className={`${styles.li}`}>
              Use full sentences to ask your question
            </li>
            <li className={`${styles.li}`}>
              Use language that is seen as REC terminology
            </li>
            <li className={`${styles.li}`}>
              Access the source documentation which is provided alongside the
              answer
            </li>
            <li>Provide feedback to allow for continuous improvement</li>
          </ul>
        </div>
        <div className={`${styles.dontBox}`}>
          <div className={`${styles.dontCircle}`}>Don't</div>
          <ul>
            <li className={`${styles.li}`}>
              Ask questions which aren't related to the REC
            </li>
            <li className={`${styles.li}`}>
              Navigate away before copying the answers to the questions you have
              asked to the model
            </li>
            <li className={`${styles.li}`}>Forget to provide feedback</li>
            <li>
              Include any personal or company-specific details in your question
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );

  const tipsExamples1Modal = (
    <Modal open={openExampleQuestions1Modal} onClose={closeModal}>
      <div className={`${styles.exampleImagesMessage}`}>
        <p>
          If you know the right terminology, try asking me questions using both
          the acronym and the exact REC term. I can then make sure I provide you
          with the most useful information as possible, like the example below.
        </p>
      </div>
      <div className={`${styles.exampleQuestions}`}>
        <Image
          className={`${styles.exampleQuestions}`}
          src={image1}
          height={350}
          width={700}
          alt="example questions 1"
        />
      </div>
      <div className={`${styles.buttonContainer}`}>
        <button className={`${styles.submit}`} onClick={tipsModalHandler}>
          Back
        </button>
        <button
          className={`${styles.submit}`}
          onClick={exampleQuestions2Handler}
        >
          Next Example
        </button>
      </div>
    </Modal>
  );

  const tipsExamples2Modal = (
    <Modal open={openExampleQuestions2Modal} onClose={closeModal}>
      <div className={`${styles.exampleImagesMessage}`}>
        <p>
          If the answer I’ve given is not quite what you are looking for, try
          and rephrase your questions to be more specific, so I can make sure my
          answer provides you with only the information and sources you need,
          like the examples below.
        </p>
      </div>
      <div className={`${styles.exampleQuestions}`}>
        <Image
          src={image2}
          height={450}
          width={800}
          alt="example questions 2"
        />
      </div>
      <button className={`${styles.submit}`} onClick={exampleQuestions1Handler}>
        Back
      </button>
    </Modal>
  );

  return (
    <ScrollableFeed>
      {showComponent && botPrompt}
      {props.chatLog}
      {tipsModal}
      {tipsExamples1Modal}
      {tipsExamples2Modal}
      {/* <div className={`${styles.typingContainer}`}>
        {!showComponent && typingDots}
      </div>
      <div className={`${styles.typingContainerSmall}`}>
        {props.isTyping && typingDots}
      </div> */}
      {!showComponent && (
        <div className={`${styles.typingContainer}`}>{typingDots}</div>
      )}
      {props.isTyping && (
        <div className={`${styles.typingContainerSmall}`}>{typingDots}</div>
      )}
    </ScrollableFeed>
  );
}

export default ChatBox;
