import React, { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { BiSupport } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import { useEffect } from "react";

function ChatBox(props) {
  const botIcon = <BiSupport className={`${styles.botIcon}`} />;

  const typingBotIcon = <BiSupport className={`${styles.typingBotIcon}`} />;

  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setShowComponent(true);
    }, 2000);
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
    <div className={`${styles.typingRow}`}>
      {typingBotIcon}
      <div className={`${styles.dotsContainer}`}>
        <div className={`${styles.dotsTyping}`}></div>
      </div>
    </div>
  );

  return (
    <ScrollableFeed>
      {showComponent && botPrompt}
      {props.chatLog}
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
