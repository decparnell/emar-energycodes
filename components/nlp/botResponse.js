import React, { Fragment, useState } from "react";
import { BiSupport, BiDislike, BiLike, BiClipboard } from "react-icons/bi";
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

  const clipboardIcon = (
    <BiClipboard
    className={`${styles.clipboardIcon}`}
    />
  );

  const dislikeIcon = (
    <BiDislike
    className={`${styles.dislikeIcon}`}
    />
  );

  const likeIcon = (
    <BiLike
    className={`${styles.likeIcon}`}
    />
  );

  const [copyText, setCopyText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const copyToClipboardHandler = () => {
    console.log(props.messageValue);
    setCopyText(props.messageValue);
    copy(copyText);
    console.log("Copied");
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
            <button
              className={`${styles.button}`}
              onClick={copyToClipboardHandler}
            >
              {clipboardIcon}
            </button>
            <button
              className={`${styles.button}`}
              onClick={feedbackHandler}
            >
              {dislikeIcon}
            </button>
            <button
              className={`${styles.button}`}
              onClick={feedbackHandler}
            >
              {likeIcon}
            </button>
          </div>
          <p className={`${styles.p}`}>{props.messageValue}</p>
        </div>
      </div>
      <Modal open={openModal} onClose={closeModal}/>
    </Fragment>
  );
}

export default BotResponse;
