import {
  getDistinctValuesSource,
  getDistinctValuesTarget,
} from "./functions/getDistinctValues";
import styles from "../../styles/dataspec.module.css";
import Dropdown from "../dropdown";

export const MessageFilters = (
  searchResults,
  sourceFilterValue,
  setSourceFilterValue,
  targetFilterValue,
  setTargetFilterValue,
  resetFilter
) => {
  const sourceOptions = getDistinctValuesSource(searchResults);
  const targetOptions = getDistinctValuesTarget(searchResults);

  return (
    <div className={styles.sourcetargetContainer}>
      <Dropdown
        style={`${styles.dataSpecDropDown} ${styles.sourceDropdown}`}
        options={sourceOptions}
        value={[sourceFilterValue, setSourceFilterValue]}
        version={false}
        dropdownType="filter"
        closeFilter={resetFilter}
      />
      <Dropdown
        style={`${styles.dataSpecDropDown} ${styles.targetDropdown}`}
        options={targetOptions}
        value={[targetFilterValue, setTargetFilterValue]}
        version={false}
        dropdownType="filter"
        closeFilter={resetFilter}
      />
    </div>
  );
};
