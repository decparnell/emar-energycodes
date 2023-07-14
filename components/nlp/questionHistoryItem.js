import React, { Fragment } from "react";
import { BiMessage } from "react-icons/bi";
import styles from "../../styles/questionHistory.module.css";

function QuestionHistoryItem(props) {
  const messageIcon = (
    <BiMessage
      style={{
        height: "15%",
        width: "15%",
        color: "#77A465",
      }}
    />
  );

  return (
    <Fragment>
      <div className={`${styles.questionContainer}`}>
        {messageIcon}
        <div className={`${styles.questionHistoryItem}`}>
          {props.messageValue}
        </div>
      </div>
    </Fragment>
  );
}

export default QuestionHistoryItem;
