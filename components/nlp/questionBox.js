import styles from "../../styles/nlp.module.css";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { TextField } from "@mui/material";
function QuestionBox(props) {
  const sendIcon = (
    <BiSend
      className={
        props.isTyping && props.query === ""
          ? `${styles.sendIconDisabled}`
          : `${styles.sendIcon}`
      }
    />
  );

  /* const sendIcon = <BiSend className={`${styles.sendIcon}`} />; */

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const disableButton = () => {
    props.isTyping
      ? setDisableSubmitButton(true)
      : setDisableSubmitButton(false);
  };

  const askQuestionHandler = (event) => {
    if (props.isTyping && props.query === "") {
      setDisableSubmitButton(true);
    } else {
      event.preventDefault();
      props.onAskQuestion();
      disableButton();
    }
  };

  const questionChangeHandler = (event) => {
    props.setQuery(event.target.value);
  };

  const pressEnterHandler = (event) => {
    if (
      event.keyCode == 13 &&
      event.shiftKey == false &&
      props.isTyping === false
    ) {
      event.preventDefault();
      props.onAskQuestion();
      disableButton();
    } else {
      return;
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
          variant="outlined"
          margin="none"
          fullWidth
        />
        <button
          title="Submit"
          type="submit"
          className={`${styles.button}`}
          disabled={disableSubmitButton}
        >
          {sendIcon}
        </button>
      </div>
    </form>
  );
}

export default QuestionBox;
