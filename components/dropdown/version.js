import { useRouter } from "next/router";
import styles from "../../styles/dropdown.module.css";
import stylesHead from "../../styles/header.module.css";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
function VersionDropDown() {
  const value = useContext(AppContext);
  let { allDataSpecVersions, latestDataSpecVersion, currentVersionMapping } = value.state;
  const { setLoading } = useContext(AppContext);
  const router = useRouter();
  const { version } = router.query;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownValue = latestDataSpecVersion;
  const setDropdownValue = value.setLatestDataSpecVersion;
  const schedule_id = router.query.schedule_id;
  
  if(router.pathname.includes("/codes-schedules/")){
    const currentDocVersionName = currentVersionMapping.filter((item) => item.documentId == schedule_id)[0].docVersionName;
    
    useEffect(() => {
      router.push(`/codes-schedules/${router.query.schedule_id}/${currentDocVersionName}`);
    }, [router.pathname, router.query.schedule_id, currentDocVersionName]);
  }

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
