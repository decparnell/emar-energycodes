import styles from "../../styles/chatBox.module.css";

export const ContactsMessage = (props) => {
  const message = "HEY HEY, I'M JUST A PLACE HOLDER FOR THE CONTACTS MESSAGE";
  return (
    <div className={`${styles.botResponse}`}>
      {props.botIcon}
      <div
        className={`${styles.botMessage}`}
        style={{ borderColor: "forestgreen" }}
      >
        <p className={`${styles.p}`}>{message}</p>
      </div>
    </div>
  );
};
