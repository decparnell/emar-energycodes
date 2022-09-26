import React, { useState } from "react";
import styles from "../../../styles/helperFunctions.module.css";

function OnHoverToolTip({ title, children }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className={styles.tooltiptext}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {children}
      {isShown && <div className={styles.tooltip}>{title}</div>}
    </div>
  );
}

export default OnHoverToolTip;
