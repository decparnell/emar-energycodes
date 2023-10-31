import styles from "../../styles/chatBox.module.css";

export const ContactsMessage = (props) => {
  const sendSupportEmailHandler = () => {
    window.open(
      "mailto:enquiries@recmanager.co.uk?subject=Support query for ERIN"
    );
  };

  const message = (
    <>
      You can find the list of REC contact details and the link to the Service
      Desk{" "}
      <a
        className={`${styles.link}`}
        target="_blank"
        rel="noreferrer"
        href={"https://recportal.co.uk/web/guest/service-desk-landing"}
      >
        here
      </a>
      , or by sending an email to{" "}
      <a className={`${styles.link}`} onClick={sendSupportEmailHandler}>
        enquiries@recmanager.co.uk
      </a>
      . They'll be more than happy to help you.
    </>
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
