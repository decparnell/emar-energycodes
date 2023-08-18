import styles from "../../styles/chatBox.module.css";

export const ContactsMessage = (props) => {

  const sendSupportEmailHandler = () => {
    window.open("mailto:support@recmanager.co.uk?subject=Support query for ERIN");
  };

  const message = (
    <p>
      You can find a list of REC Contact Details{" "}
      <a className={`${styles.link}`} target="_blank" rel="noreferrer" href={"https://recportal.co.uk/web/guest/service-desk-landing"}>
        here
      </a>
      . If this doesn’t provide you with the contact details you need, you can
      contact my colleagues at the REC through the{" "}
      <a className={`${styles.link}`} target="_blank" rel="noreferrer" href={"https://recportal.co.uk/web/guest/service-desk-landing"}>
        Service Desk
      </a>
      , or by sending an email to{" "}
      <a className={`${styles.link}`} onClick={sendSupportEmailHandler}>
        support@recmanager.co.uk
      </a>
      . They'll be more than happy to help you!"
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
