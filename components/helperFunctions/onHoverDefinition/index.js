import React, { useState } from "react";
import styles from "../../../styles/helperFunctions.module.css";

function hoverOverFunctionDefinition(
  definitionString,
  linkingWord,
  linkAddress
) {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <a
        className={styles.tooltiptext}
        href={`/codes-schedules/definitions/${encodeURIComponent(linkAddress)}`}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {linkingWord}
      </a>
      {isShown && <div className={styles.tooltip}>{definitionString}</div>}
    </>
  );
}

export default hoverOverFunctionDefinition;
