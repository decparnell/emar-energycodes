import React, { Fragment, useState } from "react";
import styles from "../../styles/modal.module.css";
import { BiX } from "react-icons/bi";

//This component receives props from the parent component App.js
const Backdrop = (props) => {
  //This will also receive an onClick prop that points to the forwarded onClose prop from the App
  return <div className={`${styles.backdrop}`} onClick={props.onClose} />;
};

//This component receives props from the parent's child component in Cart.js where it will display the cartItems
const ModalOverlay = (props) => {
  const closeIcon = (
    <BiX
      style={{
        height: "90%",
        width: "90%",
        color: "#77A465",
        cursor: "pointer",
      }}
    />
  );

  const [enteredFeedback, setEnteredFeedback] = useState("");

  const submitFeedbackHandler = (event) => {
    event.preventDefault();

    if (enteredFeedback.trim().length === 0) {
      return;
    }
    //props.onSubmitFeedback(enteredFeedback);
    console.log(enteredFeedback);
    setEnteredFeedback("");
  };

  const feedbackChangeHandler = (event) => {
    setEnteredFeedback(event.target.value);
  };

  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.closeContainer}`}>
      <button className={`${styles.close}`} onClick={props.onClose}>{closeIcon}</button>
      </div>
      <div className={`${styles.content}`}>
        <form className={`${styles.feedback}`} onSubmit={submitFeedbackHandler}>
          Please give some feedback
          <div className={`${styles.feedbackBox}`}>
            <textarea
              className={`${styles.input}`}
              name="Feedback box"
              rows="5"
              cols="70"
              wrap="soft"
              value={enteredFeedback}
              onChange={feedbackChangeHandler}
            ></textarea>
          </div>
        </form>
        <button type="submit" className={`${styles.button}`}>
          Submit
        </button>
      </div>
    </div>
  );
};

function Modal(props) {
  if (props.open === false) return null;

  return (
    <Fragment>
      <ModalOverlay onClose={props.onClose} />
      <Backdrop onClose={props.onClose} />
    </Fragment>
  );
}

export default Modal;
