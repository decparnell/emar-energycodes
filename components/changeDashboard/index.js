import React from "react";
import styles from "../../styles/change.module.css"
import { FaUserEdit, FaUserPlus, FaUserTimes } from "react-icons/fa";


function ChangeDashboard(props) {

    return (
        <div className={styles.mainContainerBox}>
            <div className={`${styles.containerBox} box`}>
                <h5 className={styles.changeDashboardTitle}>Existing Changes</h5>
            </div>
            <div className={`${styles.containerBox} box`}>
                <h5 className={styles.changeDashboardTitle}>Access Settings</h5>
                <div className={styles.iconBox}>
                    <div className={styles.image}>
                        <FaUserPlus className={styles.preicon} />
                        <p className={styles.pretext}>New User</p>
                    </div>
                    <div className={styles.image}>
                        <FaUserEdit className={styles.preicon} />
                        <p className={styles.pretext}>Edit User</p>
                    </div>
                    <div className={styles.image}>
                        <FaUserTimes className={styles.preicon} />
                        <p className={styles.pretext}>Remove User</p>
                    </div>
                </div>
            </div>
            <div className={`${styles.containerBox} box`}>
                <h5 className={styles.changeDashboardTitle}>Global Settings</h5>
            </div>
        </div>
    );

}

export default ChangeDashboard;