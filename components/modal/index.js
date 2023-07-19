import React, { Fragment, useState } from "react";
import styles from "../../styles/modal.module.css";
import { BiX } from "react-icons/bi";

const Backdrop = (props) => {
  return <div className={`${styles.backdrop}`} onClick={props.onClose} />;
};

const SuccessModal = (props) => {
  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.closeContainer}`}>
        <button className={`${styles.close}`} onClick={props.onClose}>
        <BiX title={"Close"} className={`${styles.closeIcon}`} />
        </button>
      </div>
      <div className={`${styles.content}`}>
        <p>Thank you for your feedback and helping to improve this service</p>
      </div>
    </div>
  );
};

const ModalOverlay = (props) => {
  const [enteredFeedback, setEnteredFeedback] = useState("");

  const submitFeedbackHandler = (event) => {
    event.preventDefault();

    if (enteredFeedback.trim().length === 0) {
      return;
    }
    //props.onSubmitFeedback(enteredFeedback);
    setEnteredFeedback("");
    props.onClose();
    <SuccessModal onClose={props.onClose} />;
  };

  const feedbackChangeHandler = (event) => {
    setEnteredFeedback(event.target.value);
  };

  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.closeContainer}`}>
        <button className={`${styles.close}`} onClick={props.onClose}>
          <BiX title={"Close"} className={`${styles.closeIcon}`} />
        </button>
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
          <button type="submit" className={`${styles.button}`}>
            Submit
          </button>
        </form>
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
