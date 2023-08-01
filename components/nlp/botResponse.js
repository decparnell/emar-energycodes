import React, { Fragment, useState } from "react";
import copy from "copy-to-clipboard";
import { BiSupport, BiCopyAlt, BiDislike, BiLike } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import Modal from "../modal/index.js";

function BotResponse(props) {
  const botIcon = <BiSupport className={`${styles.botIcon}`} />;
  //maybe make some of these into an array... its busy
  const [copiedText, setCopiedText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [enteredFeedback, setEnteredFeedback] = useState("");
  const [copyIconClicked, setCopyIconClicked] = useState(false);
  const [dislikeIconClicked, setDislikeIconClicked] = useState(false);
  const [likeIconClicked, setLikeIconClicked] = useState(false);
  const [disableLikeButton, setDisableLikeButton] = useState(false);
  const [disableDislikeButton, setDisableDislikeButton] = useState(false);

  const copyToClipboardHandler = () => {
    setCopyIconClicked(true);
    setCopiedText(props.messageValue);
    copy(copiedText);
  };

  const dislikeFeedbackHandler = () => {
    setOpenFeedbackModal(false);
    setOpenModal(true);
    setDislikeIconClicked(true);
    setDisableLikeButton(true);
  };

  const likeFeedbackHandler = () => {
    setOpenFeedbackModal(false);
    setOpenModal(true);
    setLikeIconClicked(true);
    setDisableDislikeButton(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const closeFeedbackModal = () => {
    setOpenFeedbackModal(false);
  };

  const submitFeedbackHandler = (event) => {
    event.preventDefault();

    if (enteredFeedback.trim().length === 0) {
      return;
    }
    //props.onSubmitFeedback(enteredFeedback);
    setEnteredFeedback("");
    closeModal();
    setOpenFeedbackModal(true);
  };

  const feedbackChangeHandler = (event) => {
    setEnteredFeedback(event.target.value);
  };

  const feedbackModal = (
    <Modal open={openModal} onClose={closeModal}>
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
        <button type="submit" className={`${styles.submit}`}>
          Submit
        </button>
      </form>
    </Modal>
  );

  const showSuccessModal = (
    <Modal open={openFeedbackModal} onClose={closeFeedbackModal}>
      <p>Thank you for your feedback and helping to improve this service</p>
    </Modal>
  );

  //Checking to see if the data renders correctly
  //Needs a check to use either contextDocuments / verifiedSources

  const source = props.response.contextDocuments.map((source) => {
    console.log(source[0]);
    return (
      <li>
        <p className={`${styles.p}`}>
          {source[0]} - Version: {source.Version} - Part: {source.Part}
          {source.Section ? <> - Section: {source.Section}</> : null}
          {source.Clause ? <> - Clause: {source.Clause}</> : null}
        </p>
      </li>
    );
  });

  const sourcesList = <ul style={{ listStyle: "disc" }}>{source}</ul>;

  return (
    <Fragment>
      <div className={`${styles.botResponse}`}>
        {botIcon}
        <div
          className={`${styles.botMessage}`}
          style={
            props.botSentiment === "complete_answer"
              ? { borderColor: "forestgreen" }
              : props.botSentiment === "partial_answer"
              ? { borderColor: "#FFEB3A" }
              : { borderColor: "orangered" }
          }
        >
          <div className={`${styles.options}`}>
            <button
              title="Copy to clipboard"
              className={`${styles.button}`}
              onClick={copyToClipboardHandler}
            >
              <BiCopyAlt
                className={
                  copyIconClicked
                    ? `${styles.copyIconClicked}`
                    : `${styles.copyIcon}`
                }
              />
            </button>
            <button
              title="Dislike Response"
              className={`${styles.button}`}
              disabled={disableLikeButton}
              onClick={dislikeFeedbackHandler}
            >
              <BiDislike
                className={
                  dislikeIconClicked
                    ? `${styles.dislikeIconClicked}`
                    : likeIconClicked
                    ? `${styles.dislikeIconDisabled}`
                    : `${styles.dislikeIcon}`
                }
              />
            </button>
            <button
              title="Like Response"
              className={`${styles.button}`}
              disabled={disableDislikeButton}
              onClick={likeFeedbackHandler}
            >
              <BiLike
                className={
                  likeIconClicked
                    ? `${styles.likeIconClicked}`
                    : dislikeIconClicked
                    ? `${styles.likeIconDisabled}`
                    : `${styles.likeIcon}`
                }
              />
            </button>
          </div>
          <p className={`${styles.p}`}>{props.messageValue}</p>
          <div className={`${styles.sourcesContainer}`}>
            Sources:
            {sourcesList}
          </div>
        </div>
      </div>
      {feedbackModal}
      {openFeedbackModal && showSuccessModal}
    </Fragment>
  );
}

export default BotResponse;
