import React, { Fragment, useState } from "react";
import copy from "copy-to-clipboard";
import { BiSupport, BiCopyAlt, BiDislike, BiLike } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import Modal from "../modal/index.js";
function BotResponse(props) {
  const responseObj = props.response;
  const message = props.messageValue ? props.messageValue : responseObj.answer;
  const messageSentiment = props.botSentiment;
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
    setCopiedText(message);
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

  const sourceObj =
    messageSentiment === "complete_answer"
      ? responseObj.verifiedSources
      : messageSentiment === "partial_answer"
      ? responseObj.contextDocuments
      : null;

  const sources = sourceObj
    ? sourceObj.map((source, index) => {
        const key0 = Object.keys(source)[0];
        const hrefValue =
          key0.toLowerCase() !== "definition"
            ? `/codes-schedules/${source.documentId_FK}/${source.Version}`
            : `/codes-schedules/definitions/${source.documentId_FK}`;
        return (
          <a
            href={hrefValue}
            rel="noopener noreferrer"
            target="_blank"
            key={index}
          >
            <li>
              {key0.toLowerCase() !== "definition" ? (
                <p className={`${styles.p} pointer`}>
                  <b>
                    {source[key0]} V{source.Version}
                  </b>{" "}
                  -{" "}
                  {source.Part.toLowerCase() !== "main"
                    ? `${source.Part}  -`
                    : null}
                  {source.Section ? <> {source.Section}</> : null}
                  {source.Clause ? <> - {source.Clause}</> : null}
                </p>
              ) : (
                <p className={`${styles.p}`}>
                  <b>
                    {source[key0]} V{source.Version}
                  </b>{" "}
                  - {source.Part}
                </p>
              )}
            </li>
          </a>
        );
      })
    : null;

  const sourcesList = <ul style={{ listStyle: "disc" }}>{sources}</ul>;

  return (
    <Fragment>
      <div className={`${styles.botResponse}`}>
        {botIcon}
        <div
          className={`${styles.botMessage}`}
          style={
            messageSentiment === "complete_answer"
              ? { borderColor: "forestgreen" }
              : messageSentiment === "partial_answer"
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
          <p className={`${styles.p}`}>{message}</p>
          <div className={`${styles.sourcesContainer}`}>
            {sourcesList ? sourcesList : null}
          </div>
        </div>
      </div>
      {feedbackModal}
      {openFeedbackModal && showSuccessModal}
    </Fragment>
  );
}

export default BotResponse;
