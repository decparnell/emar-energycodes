import React, { Fragment, useState } from "react";
import { BiBot, BiMessageDots } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import { useEffect } from "react";

function ChatBox(props) {
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

  const botTypingIcon = (
    <BiMessageDots
      style={{
        height: "100%",
        width: "100%",
        color: "green",
        paddingBottom: "0.5%",
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

  return (
    <Fragment>
      {showComponent && botPrompt}
      {props.chatLog}
      <div className={`${styles.typingContainer}`}>
        {!showComponent && botTypingIcon}
        {props.isTyping && botTypingIcon}
      </div>
    </Fragment>
  );
}

export default ChatBox;
