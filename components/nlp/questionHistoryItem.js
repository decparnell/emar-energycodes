import React, { Fragment, useState } from "react";
import { BiMessage } from "react-icons/bi";
import styles from "../../styles/questionHistory.module.css";

function QuestionHistoryItem(props) {
  const messageIcon = <BiMessage className={`${styles.messageIcon}`} />;

  const [questionHistoryItem, setQuestionHistoryItem] = useState("");

  const askQuestionHandler = () => {
    console.log(props.messageValue);
    setQuestionHistoryItem(props.messageValue);
    props.onReAskQuestion(questionHistoryItem);
    setQuestionHistoryItem("");
  };

  return (
    <Fragment>
      <div className={`${styles.questionContainer}`}>
        {messageIcon}
        <div
          onClick={askQuestionHandler}
          className={`${styles.questionHistoryItem}`}
        >
          {props.messageValue}
        </div>
      </div>
    </Fragment>
  );
}

export default QuestionHistoryItem;
