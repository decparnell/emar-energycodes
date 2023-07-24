import { Fragment } from "react";
import styles from "../../styles/questionHistory.module.css";
import QuestionHistoryItem from "./questionHistoryItem";
function QuestionHistory(props) {
  return (
    <Fragment>
      <div
        title="Click to ask again"
        className={`${styles.questionHistory} box`}
      >
        {props.questionHistory.map((item) => {
          const setQueryFromHistory = () => {
            props.setQuery(item.props.messageValue);
          };
          return (
            <QuestionHistoryItem
              messageValue={item.props.messageValue}
              onAskQuestionFromHistory={setQueryFromHistory}
              key={`${item.key}_PREV`}
            />
          );
        })}
      </div>
    </Fragment>
  );
}

export default QuestionHistory;
