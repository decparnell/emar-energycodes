import React, { Fragment, useState } from "react";
import copy from "copy-to-clipboard";
import { BiSupport, BiCopyAlt, BiDislike, BiLike } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";
import Modal from "../modal/index.js";

function BotResponse(props) {
  const botIcon = (
    <BiSupport
      style={{
        height: "4%",
        width: "4%",
        color: "#77A465",
      }}
    />
  );

  const clipboardIcon = <BiCopyAlt className={`${styles.clipboardIcon}`} />;

  const dislikeIcon = <BiDislike className={`${styles.dislikeIcon}`} />;

  const likeIcon = <BiLike className={`${styles.likeIcon}`} />;

  const [copiedText, setCopiedText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const copyToClipboardHandler = () => {
    setCopiedText(props.messageValue);
    copy(copiedText);
  };

  const feedbackHandler = () => {
    setOpenModal(true);
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
            <button title="Copy to clipboard" className={`${styles.button}`} onClick={copyToClipboardHandler}>
              {clipboardIcon}
            </button>
            <button title="Dislike Response" className={`${styles.button}`} onClick={feedbackHandler}>
              {dislikeIcon}
            </button>
            <button title="Like Response" className={`${styles.button}`} onClick={feedbackHandler}>
              {likeIcon}
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
