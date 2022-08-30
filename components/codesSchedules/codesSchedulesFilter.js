import { getDistinctValuesSchedules } from "../dataspec/functions/getDistinctValues";
import styles from "../../styles/codes.module.css";
import Dropdown from "../dropdown";

export const MessageFilters = (
  searchResults,
  schedulesFilterValue,
  setSchedulesFilterValue,
  resetFilter
) => {
  const schedulesOptions = getDistinctValuesSchedules(searchResults);

  return (
    <div className={styles.sourcetargetContainer}>
      <Dropdown
        style={styles.dropdown}
        options={schedulesOptions}
        value={[schedulesFilterValue, setSchedulesFilterValue]}
        version={false}
        dropdownType="filter"
        closeFilter={resetFilter}
      />
    </div>
  );
};
