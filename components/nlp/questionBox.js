import styles from "../../styles/nlp.module.css";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";

const sendIcon = <BiSend className={`${styles.sendIcon}`} />;

function QuestionBox(props) {
  const askQuestionHandler = (event) => {
    event.preventDefault();

    props.onAskQuestion();
  };

  const questionChangeHandler = (event) => {
    props.setQuery(event.target.value);
  };

  return (
    <form className={`${styles.questionBox}`} onSubmit={askQuestionHandler}>
      <div className={`${styles.sendMessage} box`}>
        <textarea
          className={`${styles.input}`}
          id="username"
          placeholder="Send a message"
          name="Question box"
          rows="2"
          cols="11"
          wrap="soft"
          onChange={questionChangeHandler}
          value={props.query}
        ></textarea>
        <button title="Submit" type="submit" className={`${styles.button}`}>
          {sendIcon}
        </button>
      </div>
    </form>
  );
}

export default QuestionBox;
