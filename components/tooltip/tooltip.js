
import React from "react";
import definitions, { getStaticProps } from "../../pages/codes-schedules/definitions/[busterm]";
import styles from "../../styles.tooltip.module.css";

function ToolTip(props) {
    props = {definitions}
    return (
        <div className={styles.tooltip_con}>
            <div className={styles.tooltip}> 
                <span className={styles.tooltip}>{props.definitions}</span>
            </div>
            
        </div>
    );
}

export default ToolTip; 
