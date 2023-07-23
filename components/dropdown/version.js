import { useRouter } from "next/router";
import styles from "../../styles/dropdown.module.css";
import stylesHead from "../../styles/header.module.css";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";
function VersionDropDown() {
  const value = useContext(AppContext);
  let { allDataSpecVersions } = value.state;
  const { setLoading } = useContext(AppContext);
  const router = useRouter();
  const { version } = router.query;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownValue = version;
  const setDropdownValue = value.setLatestDataSpecVersion;

  const handleDropdownSelect = (option) => {
    setDropdownOpen((current) => !current);
    setDropdownValue(option);
    setDropdownOpen((current) => !current);
    if (option !== version) {
      const query = router.query;
      query.version = option;
      router
        .push(
          {
            pathname: router.pathname,
            query: query,
          },
          { shallow: false }
        )
        .then(() => {
          setLoading(false);
        });
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
            {allDataSpecVersions.map((option, index) => (
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
