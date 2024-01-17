import React, { useState, useEffect } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { BiSupport } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";

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
        Hi! I am ERIN, the new REC knowledge-based tool that can help you
        explore and query the REC. I’ll also give you links to REC documents to
        give you further detail. If you want any tips on how to ask the best
        questions, click{"  "}
        <a className={`${styles.link}`} onClick={props.tipsModalHandler}>
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

  return (
    <ScrollableFeed className={styles.scrollFeed}>
      {showComponent && botPrompt}
      {props.chatLog}
      {!showComponent && (
        <div className={styles.typingContainer}>{typingDots}</div>
      )}
      {props.isTyping && (
        <div className={styles.typingContainerSmall}>{typingDots}</div>
      )}
    </ScrollableFeed>
  );
}

export default ChatBox;
