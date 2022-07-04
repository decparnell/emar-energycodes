import Link from "next/link";
import styles from "../../styles/codes.module.css";

function CreateChangeTable(changeHistory, schedule_id, selectedVersion) {
  return changeHistory.map((change) => {
    const { versionName, implementationDate, reason } = change;
    return (
      <Link
        href={{
          pathname: "/codes-schedules/[schedule_id]/[versionName]",
          query: { schedule_id: schedule_id, versionName: versionName },
        }}
        key={versionName}
      >
        <tr
          className={`${selectedVersion == versionName ? styles.selected : ""}`}
          key={versionName}
        >
          <td
            className={`${
              selectedVersion == versionName ? styles.selected : ""
            }`}
          >
            {versionName}
          </td>
          <td
            className={`${
              selectedVersion == versionName ? styles.selected : ""
            }`}
          >
            {implementationDate}
          </td>
          <td
            className={`${
              selectedVersion == versionName ? styles.selected : ""
            }`}
          >
            {reason}
          </td>
        </tr>
      </Link>
    );
  });
}
export default CreateChangeTable;
