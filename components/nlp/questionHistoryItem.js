import React, { Fragment } from "react";
import { BiMessage } from "react-icons/bi";
import styles from "../../styles/questionHistory.module.css";

function QuestionHistoryItem(props) {
  const messageIcon = <BiMessage className={`${styles.messageIcon}`} />;

  const questionHistoryHandler = () => {
    props.onAskQuestionFromHistory(props.messageValue);
  };

  return (
    <div className={`${styles.questionContainer}`}>
      {messageIcon}
      <div
        onClick={questionHistoryHandler}
        className={`${styles.questionHistoryItem}`}
      >
        {props.messageValue}
      </div>
    </div>
  );
}

export default QuestionHistoryItem;
