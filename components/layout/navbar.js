import Link from "next/link";
import styles from "../../styles/header2.module.css";
import TabNavbar from "./tabHeader";
import FeedbackForm from "../feedbackForm";

function Navbar() {
  return (
    <div className={styles.joinedHeader}>
      <div className={`${styles.header} green`}>
        <div className={styles.linkContainer}>
          <Link
            className={styles.headLink}
            href="https://recportal.co.uk/recportal"
            target="_blank"
          >
            Rec Portal
          </Link>
          <Link
            className={styles.headLink}
            href="https://emar.energycodes.co.uk/rm/web#action=com.ibm.rdm.web.pages.showFoundationProjectDashboard&componentURI=https%3A%2F%2Femar.energycodes.co.uk%2Frm%2Frm-projects%2F_Xqe2IFBPEeuGWeSXvTEFcQ%2Fcomponents%2F_XwleIFBPEeuGWeSXvTEFcQ"
            target="_blank"
          >
            IBM Jazz
          </Link>
          <FeedbackForm />
          <Link
            className={styles.headLink}
            href="mailto:enquiries@recmanager.co.uk"
          >
            REC Service Desk
          </Link>
        </div>
      </div>
      <TabNavbar />
    </div>
  );
}

export default Navbar;
