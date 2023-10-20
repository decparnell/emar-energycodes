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
import UserQuestion from "./userQuestion";
import { mockData1, mockData2, mockData3, mockData4 } from "./mockData";
import download from "../customComponents/customFileDownload";
import { LogUserInfo } from "../logging";
function BotResponse(props) {
  const responseObj = props.response.response;
  const status = props.response.status;
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
  const [showSources, setShowSources] = useState(false);
  const normalMessage = status.custom_topics.length == 0;

  const [openTipsModal, setOpenTipsModal] = useState(false);
  const [openExampleQuestions1Modal, setExampleQuestions1Modal] =
    useState(false);
  const [openExampleQuestions2Modal, setExampleQuestions2Modal] =
    useState(false);

  const closeTipsModal = () => {
    setOpenTipsModal(false);
    setExampleQuestions1Modal(false);
    setExampleQuestions2Modal(false);
    LogUserInfo("CLOSE: Tips Modal", props.queryId);
  };

  const tipsModalHandler = () => {
    closeTipsModal();
    setOpenTipsModal(true);
    LogUserInfo("OPEN: Tips Modal", props.queryId);
  };

  const exampleQuestions1Handler = () => {
    closeTipsModal();
    setExampleQuestions1Modal(true);
  };

  const exampleQuestions2Handler = () => {
    closeTipsModal();
    setExampleQuestions2Modal(true);
  };

  const sendSupportEmailHandler = () => {
    window.open(
      "mailto:support@recmanager.co.uk?subject=Support query for ERIN"
    );
  };

  const tipsModal = (
    <Modal open={openTipsModal} onClose={closeTipsModal}>
      <div className={`${styles.tipsMessage}`}>
        <p>
          Hi! I’ve put together some helpful hints when asking me questions. If
          you would also like to see some examples, click{" "}
          <a className={`${styles.link}`} onClick={exampleQuestions1Handler}>
            here
          </a>
          .
        </p>
      </div>
      <div className={`${styles.tips}`}>
        <div className={`${styles.doBox}`}>
          <div className={`${styles.doCircle}`}>Do</div>
          <ul className={`${styles.thumbsUp}`}>
            <li className={`${styles.li}`}>
              Use full sentences to ask your question
            </li>
            <li className={`${styles.li}`}>
              Use language that is seen as REC terminology
            </li>
            <li className={`${styles.li}`}>
              Access the source documentation which is provided alongside the
              answer
            </li>
            <li>Provide feedback to allow for continuous improvement</li>
          </ul>
        </div>
        <div className={`${styles.dontBox}`}>
          <div className={`${styles.dontCircle}`}>Don't</div>
          <ul className={`${styles.thumbsDown}`}>
            <li className={`${styles.li}`}>
              Ask questions which aren't related to the REC
            </li>
            <li className={`${styles.li}`}>
              Navigate away before copying the answers to the questions you have
              asked to the model
            </li>
            <li className={`${styles.li}`}>Forget to provide feedback</li>
            <li>
              Include any personal or company-specific details in your question
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );

  const tipsExamples1Modal = (
    <Modal open={openExampleQuestions1Modal} onClose={closeTipsModal}>
      <div className={`${styles.exampleImagesMessage}`}>
        <p>
          If you know the right terminology, try asking me questions using both
          the acronym and the exact REC term. I can then make sure I provide you
          with the most useful information as possible, like the example below.
        </p>
      </div>
      <div className={`${styles.exampleQuestions}`}>
        <UserQuestion messageValue="What is REL?" />
        <BotResponse response={mockData1} />
        <UserQuestion messageValue="What is Retail Energy Location?" />
        <BotResponse response={mockData2} />
      </div>
      <div className={`${styles.buttonContainer}`}>
        <button className={`${styles.submit}`} onClick={tipsModalHandler}>
          Back
        </button>
        <button
          className={`${styles.submit}`}
          onClick={exampleQuestions2Handler}
        >
          Next Example
        </button>
      </div>
    </Modal>
  );

  const tipsExamples2Modal = (
    <Modal open={openExampleQuestions2Modal} onClose={closeTipsModal}>
      <div className={`${styles.exampleImagesMessage}`}>
        <p>
          If the answer I’ve given is not quite what you are looking for, try
          and rephrase your questions to be more specific, so I can make sure my
          answer provides you with only the information and sources you need,
          like the examples below.
        </p>
      </div>
      <div className={`${styles.exampleQuestions}`}>
        <UserQuestion messageValue="If I don't like a decision, can I appeal?" />
        <BotResponse response={mockData3} />
        <UserQuestion messageValue="If I don't like a decision for a self-governance-change, can this be appealed?" />
        <BotResponse response={mockData4} />
      </div>
      <button className={`${styles.submit}`} onClick={exampleQuestions1Handler}>
        Back
      </button>
    </Modal>
  );

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
      <a className={`${styles.link}`} onClick={sendSupportEmailHandler}>
        support@recmanager.co.uk
      </a>
      . They'll be more than happy to help you!
    </>
  );

  const Message = () => {
    if (!normalMessage) {
      return null;
    } else if (messageSentiment === "failed_to_answer") {
      return <p className={`${styles.p}`}>{inappropriateResponseMessage}</p>;
    } else {
      return <p className={`${styles.p}`}>{responseObj.answer}</p>;
    }
  };

  const copyToClipboardHandler = () => {
    setCopyIconClicked(true);
    setCopiedText(messageValue);
    copy(copiedText);
    LogUserInfo("COPY: ERIN to Clipboard", props.queryId);
  };

  const dislikeFeedbackHandler = () => {
    setOpenFeedbackModal(false);
    setOpenModal(true);
    setDislikeIconClicked(true);
    setLikeIconClicked(false);
  };

  const likeFeedbackHandler = () => {
    callFeedback(props.queryId, "positive", "", "/api/nlpFeedback_develop");
    setLikeIconClicked(true);
    setDislikeIconClicked(false);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const submitFeedbackHandler = (event) => {
    event.preventDefault();

    if (enteredFeedback.trim().length === 0) {
      return;
    }
    callFeedback(
      props.queryId,
      "negative",
      enteredFeedback,
      "/api/nlpFeedback_develop"
    );

    setEnteredFeedback("");
    closeModal();
    setOpenFeedbackModal(true);
  };

  const skipFeedbackHandler = () => {
    callFeedback(props.queryId, "negative", "", "/api/nlpFeedback_develop");
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
  const sourceObj =
    messageSentiment === "complete_answer"
      ? responseObj.verifiedSources
      : messageSentiment === "partial_answer"
      ? responseObj.contextDocuments
      : null;
  const sources = sourceObj
    ? sourceObj.map((source, index) => {
        const sourceItem =
          messageSentiment === "failed_to_answer" ? null : (
            //<a href={source.url} target="_blank" rel="noreferrer">
            <a
              onClick={() =>
                download(
                  "erin_develop",
                  source.url,
                  source.name,
                  "",
                  props.queryId
                )
              }
            >
              <p className={`${styles.p} pointer`}>
                <b>{source.name}</b>
              </p>
            </a>
          );

        return <li key={index}>{sourceItem}</li>;
      })
    : null;

  const sourcesList = (
    <ul style={{ listStyle: "disc", margin: 0 }}>{sources}</ul>
  );

  const showSourcesListHandler = () => {
    setShowSources(true);
    LogUserInfo("OPEN: ERIN show sources", props.queryId);
  };

  const hideSourcesListHandler = () => {
    setShowSources(false);
    LogUserInfo("CLOSE: ERIN hide sources", props.queryId);
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
      {normalMessage ? (
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
            {<Message />}
            <div className={`${styles.sourcesContainer}`}>
              {sourcesOptions}
              {showSources === true ? sourcesList : null}
            </div>
          </div>
        </div>
      ) : null}
      {/*  adding in for contact details */}
      {status.custom_topics.includes("contact_details") ? (
        <ContactsMessage botIcon={botIcon} />
      ) : null}
      {feedbackModal}
      {tipsModal}
      {tipsExamples1Modal}
      {tipsExamples2Modal}
    </Fragment>
  );
}

export default BotResponse;
