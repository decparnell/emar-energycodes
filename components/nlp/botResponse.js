import React, { Fragment } from "react";
import { BiSupport, BiDislike, BiLike, BiClipboard } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";

function BotResponse(props) {
  const botIcon = (
    <BiSupport
      style={{
        height: "4%",
        width: "4%",
        color: "green",
      }}
    />
  );

  const clipboardIcon = (
    <BiClipboard
      style={{
        height: "100%",
        width: "100%",
        color: "black",
        marginRight: "3%",
      }}
    />
  );

  const dislikeIcon = (
    <BiDislike
      style={{
        height: "100%",
        width: "100%",
        color: "black",
        marginRight: "3%",
      }}
    />
  );

  const likeIcon = (
    <BiLike
      style={{
        height: "100%",
        width: "100%",
        color: "black",
      }}
    />
  );

  const clipboardHandler = () => {

  }

  const dislikeHandler = () => {
    
  }

  const likeHandler = () => {
    
  }

  return (
    <Fragment>
      <div className={`${styles.botResponse}`}>
        {botIcon}
        <div className={`${styles.botMessage}`}>
          <div className={`${styles.options}`}>
            <button type="submit" className={`${styles.button}`} onClick={clipboardHandler}>
            {clipboardIcon}
            </button>
            <button type="submit" className={`${styles.button}`} onClick={dislikeHandler}>
            {dislikeIcon}
            </button>
            <button type="submit" className={`${styles.button}`} onClick={likeHandler}>
            {likeIcon}
            </button>
          </div>
          <p className={`${styles.p}`}>{props.messageValue}</p>
        </div>
      </div>
    </Fragment>
  );
}

export default BotResponse;
