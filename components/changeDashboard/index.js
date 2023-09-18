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
                        <a href="change/create-new-users" className={styles.textLink}>
                            <FaUserPlus className={styles.preicon} />
                            <p className={styles.pretext}>New User</p>
                        </a>
                    </div>
                    <div className={styles.image}>
                        <a href="change/edit-users" className={styles.textLink}>
                            <FaUserEdit className={styles.preicon} />
                            <p className={styles.pretext}>Edit User</p>
                        </a>
                    </div>
                    <div className={styles.image}>
                        <a href="change/remove-users" className={styles.textLink}>
                            <FaUserTimes className={styles.preicon} />
                            <p className={styles.pretext}>Remove User</p>
                        </a>
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