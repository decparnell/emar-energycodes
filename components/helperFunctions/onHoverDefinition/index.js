import styles from "../../../styles/helperFunctions.module.css";
import React, { useState, useContext, Fragment } from "react";
import AppContext from "../../context/AppContext";

function HoverOverFunctionDefinition(
  definitionString,
  linkType,
  linkingWord,
  linkAddress,
  versionName
) {
  /*   const [isShown, setIsShown] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);


  const handleMouseEnter = (event) => {
    //do the api call here await data and feedback
    setDelayHandler(
      setTimeout(() => {
        setIsShown(true);
      }, 500)
    );
  };

  const handleMouseLeave = () => {
    setIsShown(false);
    clearTimeout(delayHandler);
  }; */

  return (
    <Fragment key={linkingWord}>
      {linkType == "definition" ? (
        <a
          className={styles.tooltiptext}
          href={`/codes-schedules/definitions/${encodeURIComponent(
            linkAddress
          )}`}
          target="_blank"
          rel="noreferrer"
          /* onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} */
        >
          {linkingWord}
        </a>
      ) : (
        //CHANGE : Latest dataspec version for the version of the document
        <a
          className={styles.tooltiptext}
          href={`/codes-schedules/${encodeURIComponent(
            linkAddress
          )}/${encodeURIComponent(versionName)}
          `}
          target="_blank"
          rel="noreferrer"
          /* onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} */
        >
          {linkingWord}
        </a>
      )}
      {/* {isShown && (
        <div className={styles.tooltip}>
          {linkType == "definition"
            ? definitionString
            : "Click to go to the Schedule"}
        </div>
      )} */}
    </Fragment>
  );
}

export default HoverOverFunctionDefinition;
