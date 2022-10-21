import { getDistinctValuesSchedules } from "../dataspec/functions/getDistinctValues";
import styles from "../../styles/codesSchedulesSearch.module.css";
import ScheduleDropdown from "../dropdown/schedule";

export const MessageFilters = (
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
