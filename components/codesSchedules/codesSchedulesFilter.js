import { getDistinctValuesSchedules } from "../dataspec/functions/getDistinctValues";
import styles from "../../styles/codesSchedulesSearch.module.css";
import ScheduleDropdown from "../dropdown/schedule";

/**
 * Filter dropdown for codes schedules, items are schedules headers
 */
export const CodesSchedulesFilter = (
  scheduleList,
  schedulesFilterValue,
  setSchedulesFilterValue,
  clearFilter
) => {
  return (
    <div className={styles.sourcetargetContainer}>
      <ScheduleDropdown
        style={styles.dropdown}
        options={scheduleList}
        dropdownType="filter"
        value={[schedulesFilterValue, setSchedulesFilterValue]}
        version={false}
        closeFilter={clearFilter}
      />
    </div>
  );
};
