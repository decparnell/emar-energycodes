import styles from "../../styles/questionHistory.module.css";
import QuestionHistoryItem from "./questionHistoryItem";
import ScrollableFeed from "react-scrollable-feed";

const QuestionHistory = (props) => {
  return (
    <div title="Click to ask again" className={`box ${styles.questionHistory}`}>
      <div className={`${styles.questionHistoryContainer}`}>
        <ScrollableFeed>
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
        </ScrollableFeed>
      </div>
    </div>
  );
};

export default QuestionHistory;
