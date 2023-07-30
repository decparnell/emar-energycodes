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
  return (
    <Fragment>
      {linkType == "definition" ? (
        <a
          className={styles.tooltiptext}
          href={`/codes-schedules/definitions/${encodeURIComponent(
            linkAddress
          )}`}
          target="_blank"
          rel="noreferrer"
        >
          {linkingWord}
        </a>
      ) : linkType == "marketmessage" ? (
        <a
          className={styles.tooltiptext}
          href={`/dataspec/${encodeURIComponent(
            versionName
          )}/marketmessage/${encodeURIComponent(linkAddress)}
        `}
          target="_blank"
          rel="noreferrer"
        >
          {linkingWord}
        </a>
      ) : linkType == "dataitem" ? (
        <a
          className={styles.tooltiptext}
          href={`/dataspec/${encodeURIComponent(
            versionName
          )}/dataitem/${encodeURIComponent(linkAddress)}
        `}
          target="_blank"
          rel="noreferrer"
        >
          {linkingWord}
        </a>
      ) : linkType == "scenariovariant" ? (
        <a
          className={styles.tooltiptext}
          href={`/dataspec/${encodeURIComponent(
            versionName
          )}/scenario-variant/${encodeURIComponent(linkAddress)}
        `}
          target="_blank"
          rel="noreferrer"
        >
          {linkingWord}
        </a>
      ) : (
        <a
          className={styles.tooltiptext}
          href={`/codes-schedules/${encodeURIComponent(
            linkAddress
          )}/${encodeURIComponent(versionName)}
          `}
          target="_blank"
          rel="noreferrer"
        >
          {linkingWord}
        </a>
      )}
    </Fragment>
  );
}

export default HoverOverFunctionDefinition;
