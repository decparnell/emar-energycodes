import { getDistinctValuesSchedules } from "../dataspec/functions/getDistinctValues";
import styles from "../../styles/codes.module.css";
import ScheduleDropdown from "../dropdown/schedule";

export const MessageFilters = (
  scheduleList,
  schedulesFilterValue,
  setSchedulesFilterValue
) => {
  return (
    <div className={styles.sourcetargetContainer}>
      <ScheduleDropdown
        style={styles.dropdown}
        options={scheduleList}
        value={[schedulesFilterValue, setSchedulesFilterValue]}
        version={false}
      />
    </div>
  );
};
