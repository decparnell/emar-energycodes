import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import Dropdown from "../dropdown";
import styles from "../../styles/header.module.css";
import VersionDropDown from "../dropdown/version";
function SecondNavbar() {
  return (
    <div className={styles.secondHeader}>
      <div className={styles.navLinks}>
        <div className={styles.secondHeaderLink}>{<VersionDropDown />}</div>
      </div>
    </div>
  );
}
export default SecondNavbar;
