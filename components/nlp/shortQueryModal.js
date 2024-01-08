import styles from "../../styles/nlp.module.css";
import React from "react";
import Modal from "../modal";
/* import { TextField } from "@mui/material"; */
function ShortQueryModal(props) {
  return (
    <Modal onClose={props.onClose}>
      <h2>Warning, Query too short.</h2>
      <p>
        There is a minimum length of 10 to ensure the response is as accurate as
        possible.
      </p>
      <p>
        For the best answer possible, please be more specific about your
        request.
      </p>
    </Modal>
  );
}

export default ShortQueryModal;
