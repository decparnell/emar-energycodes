import { Fragment } from "react";
import styles from "../../styles/questionHistory.module.css";

function QuestionHistory(props) {

  return (
    <Fragment>
      <div className={`${styles.questionHistory} box`}>
        {props.questionHistory}
      </div>
    </Fragment>
  );
}

export default QuestionHistory;
