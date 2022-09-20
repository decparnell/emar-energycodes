import React, { useState } from "react";
import styles from "../../styles/helperFunctions.module.css";


function hoverOverFunctionDefinition(definitionString, linkingWord, linkAddress) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={styles.tooltip}>
      <a
        className={styles.tooltiptext}
        href={linkAddress}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {linkingWord}
      </a>
      {isShown && <div>{definitionString}</div>}
    </div>
  );
}

export default hoverOverFunctionDefinition;
