import React, { Fragment } from "react";
import { BiBot } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";

function BotResponse(props) {
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

  return (
    <Fragment>
      <div className={`${styles.botResponse}`}>
        {botIcon}
        <p className={`${styles.chatMessage}`}>{props.messageValue}</p>
      </div>
    </Fragment>
  );
}

export default BotResponse;
