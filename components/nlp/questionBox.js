import styles from "../../styles/nlp.module.css";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";

const sendIcon = (
  <BiSend
    style={{
      height: "100%",
      width: "100%",
      color: "black",
    }}
  />
);

function QuestionBox(props) {
  const [enteredQuestion, setEnteredQuestion] = useState("");

  const askQuestionHandler = (event) => {
    event.preventDefault();

    if (enteredQuestion.trim().length === 0) {
      return;
    }

    console.log(enteredQuestion);
    props.onAskQuestion(enteredQuestion);
    setEnteredQuestion("");
  };

  const questionChangeHandler = (event) => {
    setEnteredQuestion(event.target.value);
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
          value={enteredQuestion}
          onChange={questionChangeHandler}
        ></textarea>
        <button type="submit" className={`${styles.button}`}>
          {sendIcon}
        </button>
      </div>
    </form>
  );
}

export default QuestionBox;
