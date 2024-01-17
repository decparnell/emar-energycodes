import React, { Fragment } from "react";
import styles from "../../styles/modal.module.css";
import { BiX } from "react-icons/bi";

const Backdrop = (props) => {
  return <div className={`${styles.backdrop}`} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.closeContainer}`}>
        <button className={`${styles.close}`} onClick={props.onClose}>
          <BiX title={"Close"} className={`${styles.closeIcon}`} />
        </button>
      </div>
      <div className={`${styles.content}`}>{props.children}</div>
    </div>
  );
};

export const Modal = (props) => {
  //  if (props.open === false) return null;

  return (
    <Fragment>
      <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
      <Backdrop onClose={props.onClose} />
    </Fragment>
  );
};
