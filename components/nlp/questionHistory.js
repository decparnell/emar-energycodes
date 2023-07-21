import { Fragment } from "react";
import styles from "../../styles/questionHistory.module.css";
import QuestionHistoryItem from "./questionHistoryItem";
function QuestionHistory(props) {
  const history =
    props.chatLog.length > 0
      ? [
          ...new Map(
            props.chatLog
              .filter(function (el) {
                return el.type.name === "UserQuestion";
              })
              .map((item) => [item.props.messageValue, item])
          ).values(),
        ]
      : [];

  let uniquehistory = [
    ...new Map(history.map((item) => [item.props.messageValue, item])).values(),
  ];
  return (
    <Fragment>
      <div
        title="Click to ask again"
        className={`${styles.questionHistory} box`}
      >
        {history.map((item) => {
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
