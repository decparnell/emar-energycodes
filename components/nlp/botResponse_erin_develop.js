import React, { Fragment, useState } from "react";
import copy from "copy-to-clipboard";
import {
  BiSupport,
  BiCopyAlt,
  BiDislike,
  BiLike,
  BiPlus,
  BiMinus,
  BiArrowToBottom,
  BiFileFind,
  BiLink,
} from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import { callFeedback } from "./callFeedback";
import { ContactsMessage } from "./nlpContactsMessage";
import download from "../customComponents/customFileDownload";
import { LogUserInfo } from "../logging";
import OnHoverToolTip from "../helperFunctions/toolTip";
import { useRouter } from "next/navigation";
import { nlpLinkNames } from "../settings";
import { FeedbackModal } from "./modals";

function BotResponse(props) {
  const pushRouter = useRouter();
  const responseObj = props.response.response;
  const status = props.response.status;
  const openaiRequestStatus = props.response.OpenAI_request_status;
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
  const [showSourcesText, setShowSourcesText] = useState(null);
  const normalMessage = status.custom_topics.length == 0;

  const sendSupportEmailHandler = () => {
    window.open(
      "mailto:enquiries@recmanager.co.uk?subject=Support query for ERIN"
    );
  };

  const getComponentIdForLink = (captionText, documentName) => {
    const data = { captionText: captionText, documentName: documentName };
    const bodyData = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    };

    fetch("/api/getComponentId", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        const clauseInfo = data.clauseInformation;
        window.open(
          `/codes-schedules/${clauseInfo.documentId}/${clauseInfo.versionNumber}?componentId=${clauseInfo.componentId}`,
          "_ blank"
        );
        LogUserInfo(
          `Follow through link clicked => Document Id: ${clauseInfo.documentId}; ComponentId: ${clauseInfo.componentId}`,
          props.queryId
        );
      })
      .catch((error) => {
        console.error("Error logging Data:", error);
      });
  };
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
        enquiries@recmanager.co.uk
      </a>
      . They'll be more than happy to help you!
    </>
  );

  const rateLimitError =
    "WOW... Lots of people are asking me questions currently so it is taking me a little longer to find the answer, please try again";

  const genericErrorMessage = (
    <>
      OH NO... I ran into an issue with your question. Please try again,
      ensuring you are following the{" "}
      <a className={`${styles.link}`} onClick={tipsModalHandler}>
        Guidance
      </a>{" "}
      and if the issue persists please contact{" "}
      <a className={`${styles.link}`} onClick={sendSupportEmailHandler}>
        enquiries@recmanager.co.uk
      </a>
      . They'll be more than happy to help you!
    </>
  );
  const Message = () => {
    if (!normalMessage) {
      return null;
    } else if (openaiRequestStatus === "RateLimitError") {
      return <p className={`${styles.p}`}>{rateLimitError}</p>;
    } else if (openaiRequestStatus != "OK") {
      return <p className={`${styles.p}`}>{genericErrorMessage}</p>;
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
    setOpenFeedbackModal(true);
    setDislikeIconClicked(true);
    setLikeIconClicked(false);
  };

  const likeFeedbackHandler = () => {
    callFeedback(props.queryId, "positive", "", "/api/nlpFeedback_develop");
    setLikeIconClicked(true);
    setDislikeIconClicked(false);
  };

  const closeModal = () => {
    setOpenFeedbackModal(false);
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
    setOpenFeedbackModal(false);
  };

  const skipFeedbackHandler = () => {
    callFeedback(props.queryId, "negative", "", "/api/nlpFeedback_develop");
    setOpenFeedbackModal(false);
  };

  const feedbackChangeHandler = (event) => {
    setEnteredFeedback(event.target.value);
  };

  /*   const showSuccessModal = (
    <Modal onClose={setOpenSuccessModal}>
      <p>Thank you for your feedback and helping to improve this service</p>
    </Modal>
  ); */

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
            <>
              <div className={`${styles.sourceItemContainer}`}>
                <p className={`${styles.p}`}>
                  <b>{source.name}</b>
                </p>

                <OnHoverToolTip title="Open Document Snippets">
                  <BiFileFind
                    className={`${styles.downloadButton} pointer`}
                    onClick={() => {
                      if (
                        showSourcesText == `${source.name}-${props.queryId}`
                      ) {
                        setShowSourcesText(null);
                      } else {
                        setShowSourcesText(`${source.name}-${props.queryId}`);
                      }
                    }}
                  />
                </OnHoverToolTip>
                <OnHoverToolTip title="Download Complete Source Document">
                  <BiArrowToBottom
                    onClick={() =>
                      download(
                        "erin_develop",
                        source.url,
                        source.name,
                        "",
                        props.queryId
                      )
                    }
                    className={`${styles.downloadButton} pointer`}
                  />
                </OnHoverToolTip>
              </div>
              {showSourcesText == `${source.name}-${props.queryId}` ? (
                <div className={styles.sourceTextContainer}>
                  {source.captions.map((caption, index) => {
                    return (
                      <div key={index} className={styles.sourceFrag}>
                        <p className={styles.sourceTextItem}>{caption}</p>
                        {nlpLinkNames.some((v) => source.name.includes(v)) ? (
                          <BiLink
                            className={styles.linkButton}
                            onClick={() => {
                              getComponentIdForLink(caption, source.name);
                            }}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </>
          );

        return <div key={index}>{sourceItem}</div>;
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

  const clickedStyle = `${styles.copyIcon} ${
    copyIconClicked ? styles.copyIconClicked : null
  }`;

  const dislikedStyle = ` ${styles.dislikeIcon} ${
    dislikeIconClicked ? styles.dislikeIconClicked : null
  } ${likeIconClicked ? styles.disabled : null}`;

  const likedStyle = ` ${styles.likeIcon} ${
    likeIconClicked ? styles.likeIconClicked : null
  } ${dislikeIconClicked ? styles.disabled : null}`;

  const sourcesOptions = (
    <div className={`${styles.sourcesOptionsContainer}`}>
      {messageSentiment === "complete_answer" ? (
        <p>Sources:</p>
      ) : messageSentiment === "partial_answer" ? (
        <p>
          Sorry, I am not able to confirm a definitive source to support the
          given answer, so please use this answer with caution. Here's a list of
          other related sources that may help with your question, or you can
          have a look at{" "}
          <a className={`${styles.link}`} onClick={tipsModalHandler}>
            these question
          </a>{" "}
          tips to help me give you the best answer:
        </p>
      ) : null}
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
              </div>
            </div>
            {<Message />}
            <div className={`${styles.sourcesContainer}`}>
              <div className={`${styles.thumbOptions}`}>
                <p>Was this answer helpful?</p>
                <button
                  title="Like Response"
                  className={`${styles.messageButton}`}
                  disabled={likeIconClicked}
                  onClick={likeFeedbackHandler}
                >
                  <BiLike className={likedStyle} />
                </button>
                <button
                  title="Dislike Response"
                  className={`${styles.messageButton}`}
                  disabled={dislikeIconClicked}
                  onClick={dislikeFeedbackHandler}
                >
                  <BiDislike className={dislikedStyle} />
                </button>
              </div>
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
      {openFeedbackModal ? (
        <FeedbackModal
          enteredFeedback={enteredFeedback}
          skipFeedbackHandler={skipFeedbackHandler}
          submitFeedbackHandler={submitFeedbackHandler}
          feedbackChangeHandler={feedbackChangeHandler}
        />
      ) : null}
      {/*
       {tipsModal}
      {tipsExamples1Modal}
      {tipsExamples2Modal} */}
    </Fragment>
  );
}

export default BotResponse;
