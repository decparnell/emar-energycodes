import Link from "next/link";
import styles from "../../styles/header2.module.css";
import TabNavbar from "./tabHeader";
import FeedbackForm from "../feedbackForm";

function Navbar() {
  return (
    <div className={styles.joinedHeader}>
      <div className={`${styles.header} green`}>
        <div className={styles.linkContainer}>
          <Link className={styles.headLink} href="/">
            IBM Jazz
          </Link>
          <FeedbackForm />
          <Link className={styles.headLink} href="/">
            REC Service Desk
          </Link>
        </div>
      </div>
      <TabNavbar />
    </div>
  );
}

export default Navbar;
