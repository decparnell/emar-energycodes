import React from "react";
import { useState, useEffect } from "react";
import styles from "../../../styles/change.module.css";
import { useRouter } from "next/router";
import Modal from "../../../components/modal/index.js"

function RemoveUser({ userData }) {
    const router = useRouter();
    const [selectedUser, setSelectedUser] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleYesClick = () => {
        removeUserDetails();
    };

    const handleRowClick = (entry) => {
        setSelectedUser(entry);
    };

    const handleBackButton = () => {
        router.push("/change");
    };

    const confirmationModal = (
        <Modal modalType={"CustomModal"} open={isModalOpen} onClose={closeModal}>
            <div>
                <p className={styles.confirmationModalText}>Are you sure you want to proceed?</p>
                <button onClick={handleYesClick} className={`${styles.customYesNoButton} ${styles.saveBtnStyle}`}>Yes</button>
                <button onClick={closeModal} className={`${styles.customYesNoButton} ${styles.removeBtnStyle}`}>No</button>
            </div>
        </Modal>
    );

    async function removeUserDetails() {
        const deleteReqAPI = `https://prod-10.uksouth.logic.azure.com:443/workflows/76db8b80214d43f986e7b576fa66b851/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FNPf-AmsTVcE7IDrE1FtX5Rv8ho2kRv0vSS1EraqRno`;

        const requestBody = {
            userId: selectedUser.userId
        }

        // Convert the request body to JSON
        const requestBodyJson = JSON.stringify(requestBody);

        console.log(requestBodyJson);

        const dataReq = await fetch(deleteReqAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBodyJson,
        });

        const dataJson = await dataReq.json();
        console.log(dataJson);
        if (dataJson.status != 200) {
            setErrorMessage("User not created! Please try again");
        } else {
            setErrorMessage("");
            router.push("/change");
        }

    }


    return (
        <>
            <h1 className={styles.title}>Remove User</h1>
            <div className={`${styles.removeChangeContainer} box`}>
                <div className={styles.tableContainer}>
                    <table id="UserTable" className={styles.editUserTable}>
                        <thead className={styles.theadContainer}>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>User Type</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                userData.map((entry) => (
                                    <tr key={entry.userId}
                                        onClick={() => handleRowClick(entry)}
                                        className={selectedUser.userId == entry.userId ? styles.selectedDeleteRow : null}
                                    >
                                        <td>{entry.firstName}</td>
                                        <td>{entry.lastName}</td>
                                        <td>{entry.email}</td>
                                        <td>{entry.userType}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className={styles.actionButtonContainer}>
                    <div className={styles.actionButtonContainer}>
                        <button className={`${styles.customButton} ${styles.backBtnStyle}`} onClick={handleBackButton}> Cancel </button>
                    </div>
                    <div className={styles.actionButtonContainer}>
                        <button className={selectedUser ? `${styles.customButton} ${styles.removeBtnStyle} ` : `${styles.customButton} ${styles.actionBtnDisabled} `} 
                                onClick={openModal} 
                                disabled={selectedUser==""}> Remove </button>
                    </div>
                </div>
                {confirmationModal}
            </div>
        </>
    )
}

export default RemoveUser;

export async function getServerSideProps({ req, res }) {

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=20000, stale-while-revalidate=59"
    );

    //LogicApp: getUsersDetails
    const dataReq = await fetch(
        `https://prod-18.uksouth.logic.azure.com:443/workflows/98d7b2f263c44bae8d1abacb2372c0db/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GBe5WP36GWNEhO8gOYnqKaSMREjf28wsN-TQ6e6ogjo`
    );

    const userData = await dataReq.json();

    return {
        props: {
            userData
        }
    };

}
