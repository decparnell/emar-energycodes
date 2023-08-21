import styles from "../../styles/chatBox.module.css";

export const ContactsMessage = (props) => {

  const sendSupportEmailHandler = () => {
    window.open("mailto:support@recmanager.co.uk?subject=Support query for ERIN");
  };

  const message = (
    <p>
      You can find the list of REC contact details and the link to the Service Desk{" "}
      <a className={`${styles.link}`} target="_blank" rel="noreferrer" href={"https://recportal.co.uk/web/guest/service-desk-landing"}>
        here
      </a>, or by sending an email to{" "}
      <a className={`${styles.link}`} onClick={sendSupportEmailHandler}>
        support@recmanager.co.uk
      </a>
      . They'll be more than happy to help you.
    </p>
  );
  
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
