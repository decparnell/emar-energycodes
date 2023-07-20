import React, { Fragment, useState } from "react";
import copy from "copy-to-clipboard";
import { BiSupport, BiCopyAlt, BiDislike, BiLike } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import Modal from "../modal/index.js";

function BotResponse(props) {
  const botIcon = <BiSupport className={`${styles.botIcon}`} />;

  const [copiedText, setCopiedText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [copyIconClicked, setCopyIconClicked] = useState(false);
  const [dislikeIconClicked, setDislikeIconClicked] = useState(false);
  const [likeIconClicked, setLikeIconClicked] = useState(false);
  const [disableLikeButton, setdisableLikeButton] = useState(false);
  const [disableDislikeButton, setdisableDislikeButton] = useState(false);

  const copyToClipboardHandler = () => {
    setCopyIconClicked(true);
    setCopiedText(props.messageValue);
    copy(copiedText);
  };

  const dislikeFeedbackHandler = () => {
    setOpenModal(true);
    setDislikeIconClicked(true);
    setdisableLikeButton(true);
  };

  const likeFeedbackHandler = () => {
    setOpenModal(true);
    setLikeIconClicked(true);
    setdisableDislikeButton(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Fragment>
      <div className={`${styles.botResponse}`}>
        {botIcon}
        <div className={`${styles.botMessage}`}>
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
        </div>
      </div>
      <Modal open={openModal} onClose={closeModal} />
    </Fragment>
  );
}

export default BotResponse;
