import React, { useState } from "react";
import styles from "../../../styles/helperFunctions.module.css";

function HoverOverFunctionDefinition(
  definitionString,
  linkingWord,
  linkAddress
) {
  const [isShown, setIsShown] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);
  const handleMouseEnter = (event) => {
    setDelayHandler(
      setTimeout(() => {
        setIsShown(true);
      }, 100)
    );
  };

  const handleMouseLeave = () => {
    setIsShown(false);
    clearTimeout(delayHandler);
  };

  return (
    <>
      <a
        className={styles.tooltiptext}
        href={`/codes-schedules/definitions/${encodeURIComponent(linkAddress)}`}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {linkingWord}
      </a>
      {isShown && <div className={styles.tooltip}>{definitionString}</div>}
    </>
  );
}

export default HoverOverFunctionDefinition;
