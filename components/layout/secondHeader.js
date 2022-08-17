import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import Dropdown from "../dropdown";
import styles from "../../styles/header.module.css";

function SecondNavbar() {
  const value = useContext(AppContext);
  let { latestDataSpecVersion, allDataSpecVersions } = value.state;

  return (
    <div className={styles.secondHeader}>
      <div className={styles.navLinks}>
        <div className={styles.secondHeaderLink}>
          <h4 className={styles.versionText}>Version Chosen:</h4>
        </div>
        <div className={styles.secondHeaderLink}>
          {
            <Dropdown
              style={styles.dataSpecDropDown}
              options={allDataSpecVersions}
              value={[latestDataSpecVersion, value.setLatestDataSpecVersion]}
              dropdownType="version"
              isDataspecSubPath={true}
            />
          }
        </div>
      </div>
    </div>
  );
}
export default SecondNavbar;
