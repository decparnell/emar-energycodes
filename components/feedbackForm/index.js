import React, { useState } from "react";
import styles from "../../styles/feedbackForm.module.css";
import { AiOutlineCloseCircle, AiOutlineComment } from "react-icons/ai";

const FeedbackForm = ({ setInsertError }) => {
  const [isClosed, setIsClosed] = useState(true);
  const [fullname, setFullName] = useState("unknown user");
  const [comment, setComment] = useState("");

  const onCloseMinimimisedButtonClick = () => {
    setIsClosed((closed) => !closed);
  };
  async function sendFeedbackToDatabase() {
    const dataReq = await fetch(
      `https://prod-11.uksouth.logic.azure.com/workflows/b36b8eadc12b4dddb40ba785b4844a00/triggers/manual/paths/invoke/name/${fullname}/comment/${comment}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cmZIJNw2L8UG2wPSTjs3m1wtIIEtstLsZ8DgUkBzKc0`
    );
    const dataJson = await dataReq.json();
    if (dataJson.status != 200) {
      setInsertError("Something went wrong! Please try again.");
    }
    return {
      props: { dataJson }
    };
  }

  const onFullNameChange = (event) => {
    setFullName(event.target.value);
  };
  const onFeedbackChange = (event) => {
    setComment(event.target.value);
  };

  const onFeedbackFormSubmitButton = () => {
    if (comment.length > 10) {
      sendFeedbackToDatabase();
    }
  };
  return (
    <>
      {isClosed ? (
        <div
          className={styles.minimiseBtn}
          onClick={onCloseMinimimisedButtonClick}
        >
          <AiOutlineComment className={styles.openBtn} />
        </div>
      ) : (
        <div className={styles.contactForm}>
          <div className={styles.BtnContainer}>
            <AiOutlineCloseCircle
              className={styles.closeBtn}
              onClick={onCloseMinimimisedButtonClick}
            />
          </div>
          <h3>Contact Us</h3>
          <form method="POST" class={styles.formElement} target="_self">
            <input
              type="text"
              class={styles.fullName}
              placeholder="Enter Your Name"
              onChange={onFullNameChange}
            ></input>
            <textarea
              rows="4"
              cols="50"
              class={styles.feedback}
              placeholder="Enter Your Feedback"
              minlength="10"
              onChange={onFeedbackChange}
              required
            ></textarea>
            <button
              onClick={onFeedbackFormSubmitButton}
              type="submit"
              class={styles.submitBtn}
              name="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FeedbackForm;
