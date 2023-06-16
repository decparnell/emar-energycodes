import Image from "next/image";
// import logo from "./recco_logo.PNG";
import reccoLogo from "./RECCOLogoWhiteAsset13.png";
import Link from "next/link";
import { Fragment } from "react";
import styles from "../../styles/header2.module.css";
import AsideDropDownMenu from "../AsideDropDownMenu";
import TabNavbar2 from "./tabHeader2";
import FeedbackForm from "../feedbackForm";

function navbar(chosenTab) {
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
      <TabNavbar2 />
    </div>
  );
}

export default navbar;
