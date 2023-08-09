import styles from "../../styles/documentDownload.module.css";
import { FaFileDownload } from "react-icons/fa";
import OnHoverToolTip from "../helperFunctions/toolTip";
function DocumentDownload(props) {
  const type = props.type;
  const urlDownload = props.url;
  let title = "";
  type == "schedule"
    ? (title = "Download Schedule")
    : type == "mm"
    ? (title = "Download Market Message")
    : type == "sv"
    ? (title = "Download Scenario Variant")
    : type == "di"
    ? (title = "Download Data Item")
    : "Download";

  return (
    <div className={styles.donwloadContentContainer}>
      {urlDownload ? (
        urlDownload != "unavailable" ? (
          <OnHoverToolTip title={title}>
            <a href={urlDownload} download>
              <FaFileDownload
                className={`${styles.downloadIcon} ${styles.downloadIconGrenn}`}
              />
            </a>
          </OnHoverToolTip>
        ) : null
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default DocumentDownload;
