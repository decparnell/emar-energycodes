import styles from "../../styles/questionHistory.module.css";
import QuestionHistoryItem from "./questionHistoryItem";
import ScrollableFeed from "react-scrollable-feed";
import { FiChevronRight } from "react-icons/fi";
import { AiOutlineCloseSquare } from "react-icons/ai";
const QuestionHistory = (props) => {
  const [closed, setClosed] = props.closed;
  console.log(closed);
  return closed ? (
    <button
      className={styles.openButton}
      onClick={() => setClosed(false)}
      title="Open Chat History"
    >
      <FiChevronRight
        className={styles.openArrow}
        preserveAspectRatio="none"
        height="100%"
      />
    </button>
  ) : (
    <div title="Click to ask again" className={`box ${styles.questionHistory}`}>
      <div className={styles.closeContainer}>
        <AiOutlineCloseSquare
          className={styles.closeSquare}
          onClick={() => setClosed(true)}
          title="Close Chat History"
        />
      </div>
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
