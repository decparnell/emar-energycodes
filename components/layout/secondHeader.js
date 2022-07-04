import { useRouter } from "next/router";
import Link from "next/link";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import Dropdown from "../dropdown";
import styles from "../../styles/header.module.css";
function SecondNavbar() {
  const router = useRouter();
  const pathName = router.pathname;

  let isCodesPath = false;
  let isDataSpecPath = false;
  let isDataspecSubPath = false;
  const value = useContext(AppContext);
  let { latestDataSpecVersion, allDataSpecVersions } = value.state;

  if (router.hasOwnProperty("pathname")) {
    isCodesPath = pathName.includes("codes-schedules");
    isDataSpecPath = pathName.includes("dataspec");
    isDataspecSubPath =
      pathName.includes("dataitem") ||
      pathName.includes("marketmessage") ||
      pathName.includes("scenario-variant");
  }

  return (
    <div className={styles.secondHeader}>
      {isCodesPath ? (
        <div className={styles.navLinks}>
          <div className={styles.secondHeaderLink}>
            <Link href="/codes-schedules/compare">
              Compare Schedule Versions
            </Link>
          </div>
        </div>
      ) : isDataSpecPath ? (
        <div className={styles.navLinks}>
          <div className={styles.secondHeaderLink}>
            <h4 className={styles.versionText}>Version Chosen:</h4>
          </div>
          <div className={styles.secondHeaderLink}>
            <Dropdown
              style={styles.dataSpecDropDown}
              options={allDataSpecVersions}
              value={[latestDataSpecVersion, value.setLatestDataSpecVersion]}
              dropdownType="version"
              isDataspecSubPath={isDataspecSubPath}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default SecondNavbar;
