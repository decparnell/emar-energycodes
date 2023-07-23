import { useRouter } from "next/router";
import styles from "../../styles/dropdown.module.css";
import stylesHead from "../../styles/header.module.css";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";
function VersionDropDown() {
  const value = useContext(AppContext);
  let { allDataSpecVersions, latestDataSpecVersion } = value.state;
  const { setLoading } = useContext(AppContext);
  const router = useRouter();
  const { version } = router.query;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownValue = latestDataSpecVersion;
  const setDropdownValue = value.setLatestDataSpecVersion;

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
      className={`pointer ${stylesHead.dataSpecDropDown} ${styles.dropdown}`}
      onClick={() => setDropdownOpen((current) => !current)}
    >
      REC Version: {dropdownValue}
      {dropdownOpen == false ? (
        <div className={styles.caretIcon}>
          <AiFillCaretDown />
        </div>
      ) : (
        <>
          <div className={styles.caretIcon}>
            <AiFillCaretUp />
          </div>
          <div className={styles.versionOptions}>
            {allDataSpecVersions
              .sort()
              .reverse()
              .map((option, index) => (
                <div
                  className={
                    option.name == dropdownValue
                      ? `${styles.option} ${styles.chosen} `
                      : `${styles.option} `
                  }
                  key={index}
                  onClick={() => handleDropdownSelect(option.name)}
                >
                  {prepareDropdownOption(option.name)} - {option.status}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VersionDropDown;
