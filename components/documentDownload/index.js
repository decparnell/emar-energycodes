import styles from "../../styles/documentDownload.module.css";
import { AiOutlineDownload } from "react-icons/ai";
import OnHoverToolTip from "../helperFunctions/toolTip";
function DocumentDownload(props) {
  const type = props.type;
  const url = props.url;
  let title = "";
  type == "schedule"
    ? (title = "Download Schedules")
    : type == "mm"
    ? (title = "Download Market Message")
    : type == "sv"
    ? (title = "Download Scenario Variant")
    : type == "di"
    ? (title = "Download Data Item")
    : "Download";

  return (
    <a href={url} download>
      <OnHoverToolTip title={title}>
        <AiOutlineDownload className={styles.downloadLink} />
      </OnHoverToolTip>
    </a>
  );
}

export default DocumentDownload;
