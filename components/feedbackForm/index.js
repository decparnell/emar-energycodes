import React, { useState } from "react";
import styles from "../../styles/feedbackForm.module.css";
import { AiOutlineCloseCircle, AiOutlineComment } from "react-icons/ai";
import sanitizeForUrl from "../helperFunctions/sanitizeForUrl";
const FeedbackForm = ({ setInsertError }) => {
  const [isClosed, setIsClosed] = useState(true);
  const [fullname, setFullName] = useState("unknown user");
  const [comment, setComment] = useState("");

  const onCloseMinimimisedButtonClick = () => {
    //swap between the close and open button
    setIsClosed((closed) => !closed);
  };
  async function sendFeedbackToDatabase() {
    //send the fullname to the sanitizeForUrl function and cleans the name for unwanted parts
    const cleanName = sanitizeForUrl(fullname);
    //send the comment to the sanitizeForUrl function and cleans the comment for unwanted parts
    const cleanComment = sanitizeForUrl(comment);
    //hit the url with name and comment to write on the database
    const dataReq = await fetch(
      `https://prod-11.uksouth.logic.azure.com/workflows/b36b8eadc12b4dddb40ba785b4844a00/triggers/manual/paths/invoke/name/${cleanName}/comment/${cleanComment}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cmZIJNw2L8UG2wPSTjs3m1wtIIEtstLsZ8DgUkBzKc0`
    );
    const dataJson = await dataReq.json();
    //sets an error if the call is unsuccessful
    if (dataJson.status != 200) {
      setInsertError("Something went wrong! Please try again.");
    }
    return {
      props: { dataJson }
    };
  }

  const onFullNameChange = (event) => {
    //sets the fullName
    setFullName(event.target.value);
  };
  const onFeedbackChange = (event) => {
    //sets the comment
    setComment(event.target.value);
  };

  const onFeedbackFormSubmitButton = () => {
    //checks if there is a comment to submit and if there is, calls the function to write on the database
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
          Feedback
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
          <form method="POST" className={styles.formElement} target="_self">
            <input
              type="text"
              className={styles.fullName}
              placeholder="Enter Your Name"
              onChange={onFullNameChange}
            ></input>
            <textarea
              rows="4"
              cols="50"
              className={styles.feedback}
              placeholder="Enter Your Feedback"
              minLength="10"
              onChange={onFeedbackChange}
              required
            ></textarea>
            <button
              onClick={onFeedbackFormSubmitButton}
              type="submit"
              className={styles.submitBtn}
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
