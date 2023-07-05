import React, { Fragment, useState } from "react";
import { BiBot, BiUser } from "react-icons/bi";
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

  const userIcon = (
    <BiUser
      style={{
        height: "4%",
        width: "4%",
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

  const botMessage = (
    <div className={`${styles.chatItem}`}>
      {botIcon}
      <p className={`${styles.chatMessage}`}>
        Hi, I am your RECCo assistant, here to help you with any REC related
        issues
      </p>
    </div>
  );

  return (
    <Fragment>
      {showComponent && botMessage}
      {props.messageResponse.map((message) => (
        <div key={message.id} className={`${styles.chatResponse}`}>
          {userIcon}
          <p className={`${styles.chatMessage}`}>{message.content}</p>
        </div>
      ))}
    </Fragment>
  );
}

export default ChatBox;
