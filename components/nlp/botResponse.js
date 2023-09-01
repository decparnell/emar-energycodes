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

  const [openTipsModal, setOpenTipsModal] = useState(false);
  const [openExampleQuestions1Modal, setExampleQuestions1Modal] =
    useState(false);
  const [openExampleQuestions2Modal, setExampleQuestions2Modal] =
    useState(false);

  const closeTipsModal = () => {
    setOpenTipsModal(false);
    setExampleQuestions1Modal(false);
    setExampleQuestions2Modal(false);
  };

  const tipsModalHandler = () => {
    closeTipsModal();
    setOpenTipsModal(true);
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
      <a className={`${styles.link}`} onClick={sendSupportEmailHandler}>
        support@recmanager.co.uk
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

  const messageValue = null;

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
    setOpenModal(true);
    setDislikeIconClicked(true);
    setLikeIconClicked(false);
  };

  const likeFeedbackHandler = () => {
    callFeedback(props.queryId, "positive", "");
    setLikeIconClicked(true);
    setDislikeIconClicked(false);
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
    callFeedback(props.queryId, "negative", enteredFeedback);

    setEnteredFeedback("");
    closeModal();
    setOpenFeedbackModal(true);
  };

  const skipFeedbackHandler = () => {
    callFeedback(props.queryId, "negative", "");
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

  const sourcesOptions = (
    <div className={`${styles.sourcesOptionsContainer}`}>
      Sources:
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
            <button
              title="Copy to clipboard"
              className={`${styles.button}`}
              onClick={copyToClipboardHandler}
            >
              <BiCopyAlt className={clickedStyle} />
            </button>
            <button
              title="Dislike Response"
              className={`${styles.button}`}
              disabled={dislikeIconClicked}
              onClick={dislikeFeedbackHandler}
            >
              <BiDislike className={dislikedStyle} />
            </button>
            <button
              title="Like Response"
              className={`${styles.button}`}
              disabled={likeIconClicked}
              onClick={likeFeedbackHandler}
            >
              <BiLike className={likedStyle} />
            </button>
          </div>
          {message()}
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
      {tipsModal}
      {tipsExamples1Modal}
      {tipsExamples2Modal}
    </Fragment>
  );
}

export default BotResponse;
