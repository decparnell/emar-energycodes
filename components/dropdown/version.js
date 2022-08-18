import { useRouter } from "next/router";
import styles from "../../styles/dropdown.module.css";
import stylesHead from "../../styles/header.module.css";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";
function VersionDropDown() {
  const value = useContext(AppContext);
  let { latestDataSpecVersion, allDataSpecVersions } = value.state;
  const router = useRouter();
  const { version } = router.query;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownValue = latestDataSpecVersion;
  const setDropdownValue = value.setLatestDataSpecVersion;

  const handleDropdownSelect = (option) => {
    setDropdownValue(option);
    setDropdownOpen((current) => !current);
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
      className={`${stylesHead.dataSpecDropDown} ${styles.dropdown} pointer`}
    >
      {dropdownValue}
      {dropdownOpen == false ? (
        <AiFillCaretDown
          onClick={() => setDropdownOpen((current) => !current)}
        />
      ) : (
        <>
          <AiFillCaretUp
            onClick={() => setDropdownOpen((current) => !current)}
          />
          <div className={styles.versionOptions}>
            {allDataSpecVersions.map((option, index) => (
              <div
                className={
                  option.versionNumber == dropdownValue
                    ? `${styles.option} ${styles.chosen} pointer`
                    : `${styles.option} pointer`
                }
                key={index}
                onClick={() => handleDropdownSelect(option.versionNumber)}
              >
                {prepareDropdownOption(option.versionNumber)} - {option.status}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VersionDropDown;
