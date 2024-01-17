import React, { Fragment, useState } from "react";
import copy from "copy-to-clipboard";
import {
  BiSupport,
  BiCopyAlt,
  BiDislike,
  BiLike,
  BiPlus,
  BiMinus,
} from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import Modal from "../modal/index.js";
import { callFeedback } from "./callFeedback";
import { ContactsMessage } from "./nlpContactsMessage";

function BotResponse(props) {
  const responseObj = props.response.response;
  const status = props.response.status;
  const messageSentiment = props.botSentiment;
  const tipsModalHandler = props.tipsModalHandler;
  const botIcon = <BiSupport className={`${styles.botIcon}`} />;

  //maybe make some of these into an array... its busy
  const [copiedText, setCopiedText] = useState("");
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [enteredFeedback, setEnteredFeedback] = useState("");
  const [copyIconClicked, setCopyIconClicked] = useState(false);
  const [dislikeIconClicked, setDislikeIconClicked] = useState(false);
  const [likeIconClicked, setLikeIconClicked] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [showResponse, setShowResponse] = useState(true);

  const inappropriateResponseMessage = (
    <>
      I’ve reviewed the REC, but unfortunately I can’t find the answer to your
      question. Would you please rephrase your question? You can find question
      tips{" "}
      <a className={`${styles.link}`} onClick={tipsModalHandler}>
        here
      </a>
      . Alternatively, you can contact my colleagues at the REC through the{" "}
      <a
        className={`${styles.link}`}
        target="_blank"
        rel="noreferrer"
        href={"https://recportal.co.uk/web/guest/service-desk-landing"}
      >
        Service Desk
      </a>
      , or by sending an email to{" "}
      <a
        className={`${styles.link}`}
        onClick={() =>
          window.open(
            "mailto:enquiries@recmanager.co.uk?subject=Support query for ERIN"
          )
        }
      >
        enquiries@recmanager.co.uk
      </a>
      . They'll be more than happy to help you!
    </>
  );

  //Contacts message work needs refactoring in Sprint 2
  const contactsMessage = (
    <>
      You can find the list of REC contact details and the link to the Service
      Desk{" "}
      <a
        className={`${styles.link}`}
        target="_blank"
        rel="noreferrer"
        href={"https://recportal.co.uk/web/guest/service-desk-landing"}
      >
        here
      </a>
      , or by sending an email to{" "}
      <a
        className={`${styles.link}`}
        onClick={() =>
          window.open(
            "mailto:enquiries@recmanager.co.uk?subject=Support query for ERIN"
          )
        }
      >
        enquiries@recmanager.co.uk
      </a>
      . They'll be more than happy to help you.
    </>
  );

  const containsContactDetails =
    status.custom_topics.includes("contact_details");
  const messageFailed = messageSentiment === "failed_to_answer";
  const nullAnswer = responseObj.answer === "Please find the details below:";
  const partialContactsMessage =
    status.custom_topics.includes("contact_details") &&
    messageSentiment === "partial_answer";
  const completeMessage =
    status.custom_topics.includes("contact_details") &&
    messageSentiment === "complete_answer";
  const partialCompleteMessage = completeMessage || partialContactsMessage;

  let messageValue = null;

  const message = () => {
    if (messageFailed) {
      //if (containsContactDetails) {
      if (props.response.query.includes("contact")) {
        messageValue = contactsMessage;
        return <p className={`${styles.p}`}>{contactsMessage}</p>;
      }
      messageValue = inappropriateResponseMessage;
      return <p className={`${styles.p}`}>{inappropriateResponseMessage}</p>;
    } else if (nullAnswer) {
      messageValue = contactsMessage;
      return <p className={`${styles.p}`}>{contactsMessage}</p>;
    }
    messageValue = responseObj.answer;
    return <p className={`${styles.p}`}>{responseObj.answer}</p>;
  };

  // const messages = messageFailed
  //   ? inappropriateResponseMessage
  //   : props.messageValue
  //   ? props.messageValue
  //   : responseObj.answer;

  const copyToClipboardHandler = () => {
    setCopyIconClicked(true);
    setCopiedText(messageValue);
    copy(copiedText);
  };

  const dislikeFeedbackHandler = () => {
    setOpenFeedbackModal(false);
    setOpenSuccessModal(true);
    setDislikeIconClicked(true);
    setLikeIconClicked(false);
  };

  const likeFeedbackHandler = () => {
    callFeedback(props.queryId, "positive", "");
    setLikeIconClicked(true);
    setDislikeIconClicked(false);
  };

  const submitFeedbackHandler = (event) => {
    event.preventDefault();

    if (enteredFeedback.trim().length === 0) {
      return;
    }
    callFeedback(props.queryId, "negative", enteredFeedback);

    setEnteredFeedback("");
    setOpenFeedbackModal(false);
    setOpenSuccessModal(true);
  };

  const skipFeedbackHandler = () => {
    callFeedback(props.queryId, "negative", "");
    setOpenFeedbackModal(false);
  };

  const feedbackChangeHandler = (event) => {
    setEnteredFeedback(event.target.value);
  };

  const feedbackModal = (
    <Modal onClose={skipFeedbackHandler}>
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
        <div className={`${styles.buttonContainer}`}>
          <button className={`${styles.submit}`} onClick={skipFeedbackHandler}>
            Skip
          </button>
          <button type="submit" className={`${styles.submit}`}>
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );

  const showSuccessModal = (
    <Modal onClose={setOpenSuccessModal}>
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
  console.log(sourceObj);
  const sources = sourceObj
    ? sourceObj.map((source, index) => {
        const key0 = Object.keys(source)[0];
        const hrefValue =
          key0.toLowerCase() !== "definition"
            ? `/codes-schedules/${source.documentId_FK}/${source.Version}?componentId=${source.componentId}`
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

  const sourcesList = (
    <ul style={{ listStyle: "disc", margin: 0 }}>{sources}</ul>
  );

  const showSourcesListHandler = () => {
    setShowSources(true);
  };

  const hideSourcesListHandler = () => {
    setShowSources(false);
  };

  const showResponseHandler = () => {
    setShowResponse(true);
  };

  const hideResponseHandler = () => {
    setShowResponse(false);
  };

  const sourcesOptions = (
    <div className={`${styles.sourcesOptionsContainer}`}>
      {messageSentiment === "complete_answer"
        ? "Sources:"
        : messageSentiment === "partial_answer"
        ? "Sorry, I am not able to confirm a definitive source to support the given answer, so please use this answer with caution. Here's a list of other related sources that may help with your question, or you can have a look at these question tips to help me give you the best answer:"
        : null}
      {messageSentiment === "complete_answer" ||
      messageSentiment === "partial_answer" ? (
        <>
          <button
            title="Show Sources"
            className={`${styles.button}`}
            onClick={showSourcesListHandler}
          >
            <BiPlus className={`${styles.plusMinus}`} />
          </button>
          <button
            title="Hide Sources"
            className={`${styles.button}`}
            onClick={hideSourcesListHandler}
          >
            <BiMinus className={`${styles.plusMinus}`} />
          </button>
        </>
      ) : null}
    </div>
  );

  const responseOptions = (
    <div className={`${styles.sourcesOptionsContainer}`}>
      <button
        title="Show Response"
        className={`${styles.button}`}
        onClick={showResponseHandler}
      >
        <BiPlus className={`${styles.plusMinus}`} />
      </button>
      <button
        title="Hide Response"
        className={`${styles.button}`}
        onClick={hideResponseHandler}
      >
        <BiMinus className={`${styles.plusMinus}`} />
      </button>
    </div>
  );

  const clickedStyle = `${styles.copyIcon} ${
    copyIconClicked ? styles.copyIconClicked : null
  }`;

  const dislikedStyle = ` ${styles.dislikeIcon} ${
    dislikeIconClicked ? styles.dislikeIconClicked : null
  } ${likeIconClicked ? styles.disabled : null}`;

  const likedStyle = ` ${styles.likeIcon} ${
    likeIconClicked ? styles.likeIconClicked : null
  } ${dislikeIconClicked ? styles.disabled : null}`;

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
            <div className={`${styles.messageOptions}`}>
              <button
                title="Copy to clipboard"
                className={`${styles.messageButton}`}
                onClick={copyToClipboardHandler}
              >
                <BiCopyAlt className={clickedStyle} />
              </button>
              <button
                title="Dislike Response"
                className={`${styles.messageButton}`}
                disabled={dislikeIconClicked}
                onClick={dislikeFeedbackHandler}
              >
                <BiDislike className={dislikedStyle} />
              </button>
              <button
                title="Like Response"
                className={`${styles.messageButton}`}
                disabled={likeIconClicked}
                onClick={likeFeedbackHandler}
              >
                <BiLike className={likedStyle} />
              </button>
            </div>
          </div>
          {showResponse === true ? message() : null}
          {props.answer}
          <div className={`${styles.sourcesContainer}`}>
            {sourcesOptions}
            {showSources === true ? sourcesList : null}
          </div>
        </div>
      </div>
      {/*  adding in for contact details */}
      {partialCompleteMessage ? <ContactsMessage botIcon={botIcon} /> : null}
      {feedbackModal}
    </Fragment>
  );
}

export default BotResponse;
