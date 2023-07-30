import React, { Fragment } from "react";
import { BiUser } from "react-icons/bi";
import styles from "../../styles/chatBox.module.css";

function UserQuestion(props) {
  const userIcon = <BiUser className={`${styles.userIcon}`} />;

  return (
    <Fragment>
      <div className={`${styles.userQuestion}`}>
        {userIcon}
        <p className={`${styles.chatMessage}`}>{props.messageValue}</p>
      </div>
    </Fragment>
  );
}

export default UserQuestion;