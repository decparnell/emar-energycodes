import { useRouter } from "next/router";
import styles from "../../styles/dropdown.module.css";
import {
  AiFillCaretUp,
  AiFillCaretDown,
  AiFillCloseSquare,
} from "react-icons/ai";
import React, { useState } from "react";

function Dropdown(props) {
  const router = useRouter();
  const { version } = router.query;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownValue = props.value[0];
  const dropdownType = props.dropdownType;
  const setDropdownValue = props.value[1];
  const clearFilter = props.closeFilter;
  const handleDropdownSelect = (option) => {
    if (window) {
      sessionStorage.setItem("version", option);
      setDropdownValue(sessionStorage.getItem("version"));
      if (option != version) {
        const query = router.query;
        query.version = option;
        router.push(
          {
            pathname: router.pathname,
            query: query,
          },
          { shallow: false }
        );
      }
    }
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
    <div className={`${props.style} ${styles.dropdown}`}>
      {dropdownValue}
      {dropdownType == "filter" && !dropdownValue.includes("Filter") ? (
        <AiFillCloseSquare onClick={() => clearFilter()} />
      ) : null}
      {dropdownOpen == false ? (
        <AiFillCaretDown
          onClick={() => setDropdownOpen((current) => !current)}
        />
      ) : (
        <AiFillCaretUp onClick={() => setDropdownOpen((current) => !current)} />
      )}
      {dropdownOpen && dropdownType == "version" ? (
        <div className={styles.versionOptions}>
          {props.options.map((option, index) => (
            <div
              className={
                option.versionNumber == dropdownValue
                  ? `${styles.option} ${styles.chosen}`
                  : styles.option
              }
              key={index}
              onClick={() => handleDropdownSelect(option.versionNumber)}
            >
              {prepareDropdownOption(option.versionNumber)} - {option.status}
            </div>
          ))}
        </div>
      ) : dropdownOpen && dropdownType != "version" ? (
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
      ) : null}
    </div>
  );
}

export default Dropdown;
