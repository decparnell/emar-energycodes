import styles from "../../styles/nlp.module.css";
import React from "react";
import { BiSend } from "react-icons/bi";
/* import { TextField } from "@mui/material"; */
function QuestionBox(props) {
  const sendIcon = (
    <BiSend
      className={props.isTyping ? styles.sendIconDisabled : styles.sendIcon}
    />
  );

  /* const sendIcon = <BiSend className={`${styles.sendIcon}`} />; */

  const askQuestionHandler = (event) => {
    event.preventDefault();
    if (props.isTyping !== true && props.query !== "") {
      props.onAskQuestion();
    }
  };

  const questionChangeHandler = (event) => {
    if (event.target.value.length <= 250) {
      props.setQuery(event.target.value);
    } else {
      props.setQuery(event.target.value.substr(0, 250));
    }
  };

  const pressEnterHandler = (event) => {
    if (
      event.keyCode === 13 &&
      event.shiftKey === false &&
      props.isTyping === false &&
      event.target.value.length > 0
    ) {
      event.preventDefault();
      props.onAskQuestion();
    }
  };

  return (
    <form className={`${styles.questionBox}`} onSubmit={askQuestionHandler}>
      <div className={`${styles.sendMessage}`}>
        <input
          className={`box ${styles.input}`}
          id="username"
          placeholder="Send a message"
          name="Question box"
          wrap="soft"
          onChange={questionChangeHandler}
          value={props.query}
          onKeyDown={pressEnterHandler}
        />
        <div
          className={props.query.length < 250 ? styles.length : styles.tooLong}
        >
          {props.query.length}/250
        </div>
        <button
          title="Submit"
          type="submit"
          className={styles.button}
          disabled={props.isTyping}
        >
          {sendIcon}
        </button>
      </div>
    </form>
  );
}

export default QuestionBox;
