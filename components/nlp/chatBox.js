import React, { Fragment, useState } from "react";
import { BiSupport } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import { useEffect } from "react";

function ChatBox(props) {
  const botIcon = (
    <BiSupport
      style={{
        height: "4%",
        width: "4%",
        color: "#77A465",
      }}
    />
  );

  const typingBotIcon = (
    <BiSupport
      style={{
        height: "80%",
        width: "2.5%",
        color: "#77A465",
      }}
    />
  );

  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setShowComponent(true);
    }, 1000);
  }, []);

  const botPrompt = (
    <div className={`${styles.botResponse}`}>
      {botIcon}
      <p className={`${styles.chatMessage}`}>
        Hi, I am your RECCo assistant, here to help you with any REC related
        issues
      </p>
    </div>
  );

  const typingDots = (
    <Fragment className={`${styles.typingRow}`}>
      {typingBotIcon}
      <div className={`${styles.dotsContainer}`}>
        <div className={`${styles.dotsTyping}`}></div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {showComponent && botPrompt}
      {props.chatLog}
      <div className={`${styles.typingContainer}`}>
        {!showComponent && typingDots}
        {props.isTyping && typingDots}
      </div>
    </Fragment>
  );
}

export default ChatBox;
