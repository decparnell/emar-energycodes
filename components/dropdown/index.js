import { useRouter } from "next/router";
import styles from "../../styles/dropdown.module.css";
import {
  AiFillCaretUp,
  AiFillCaretDown,
  AiFillCloseSquare,
} from "react-icons/ai";
import React, { useState } from "react";

function Dropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownValue = props.value[0];
  const dropdownType = props.dropdownType;
  const setDropdownValue = props.value[1];
  const clearFilter = props.closeFilter;

  const handleDropdownSelect = (option) => {
    setDropdownOpen((current) => !current);
    setDropdownValue(option);
    setDropdownOpen((current) => !current);
  };

  const prepareDropdownOption = (option) => {
    if (Number.isInteger(option)) {
      return option.toFixed(1);
    } else {
      return option;
    }
  };

  return (
    <div
      className={`${props.style} ${styles.dropdown} pointer`}
      onClick={() => setDropdownOpen((current) => !current)}
    >
      {dropdownValue}
      {dropdownType == "filter" && !dropdownValue.includes("Filter") ? (
        <AiFillCloseSquare onClick={() => clearFilter()} />
      ) : null}
      {dropdownOpen == false ? (
        <AiFillCaretDown />
      ) : (
        <>
          <AiFillCaretUp />
          <div className={styles.options}>
            {props.options.map((option, index) => (
              <div
                className={styles.option}
                key={index}
                onClick={() => handleDropdownSelect(option)}
              >
                {prepareDropdownOption(option)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dropdown;
