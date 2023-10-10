import React from "react";
import { useState, useEffect } from "react";
import styles from "../../../styles/change.module.css";
import { useRouter } from "next/router";

function EditUser({ userData }) {

    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");

    const [selectedUser, setSelectedUser] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const listUserType = ["Admin", "Change User"];


    useEffect(() => {
        setUserId(selectedUser.userId);
        setFirstName(selectedUser.firstName);
        setLastName(selectedUser.lastName);
        setEmail(selectedUser.email);
        setUserType(selectedUser.userType);
    }, [selectedUser]);


    const handleSaveBtn = () => {
        const checkIsValid = firstName !== "" && lastName !== "" && email !== "" && userType !== ""
        if (checkIsValid) {
            updateUserDetails();
        }
    };

    const handleBackButton = () => {
        router.push("/change");
    };

    async function updateUserDetails() {
        const postReqAPI = `https://prod-28.uksouth.logic.azure.com:443/workflows/ac84726c8dbd4689b16681344f10e4d5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sU4hfFmZ0usKF4rONN_cZe8o2r-eUQtHt6D8TPHFnwI`;

        setIsLoading(true);
        const requestBody = {
            userId: userId,
            email: email,
            firstName: firstName,
            lastName: lastName,
            userType: userType
        };

        // Convert the request body to JSON
        const requestBodyJson = JSON.stringify(requestBody);

        const dataReq = await fetch(postReqAPI, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBodyJson,
        });

        const dataJson = await dataReq.json();
        setIsLoading(false);
        if (dataJson.status != 200) {
            setErrorMessage("User  not updated! Please try again");
        } else {
            setErrorMessage("");
            router.push("/change");
        }


    }

    const handleRowClick = (entry) => {
        setSelectedUser(entry);
    };

    return (
        <>
            <h1 className={styles.title}>Edit User</h1>
            <div className={`${styles.editChangeTableContainer} box`}>
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
                        <tbody>
                            {
                                userData.map((entry) => (
                                    <tr key={entry.userId}
                                        onClick={() => handleRowClick(entry)}
                                        className={selectedUser.userId == entry.userId ? styles.selectedRow : null}
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
            </div>
            {selectedUser ?
                <div className={`${styles.editChangeContainer} box`}>
                    <div className={styles.separtor} />
                    <div className={`${styles.rowContainer}`}>
                        <div className={styles.col25}>
                            <label className={styles.labelForTextBox} for="firstName">First Name</label>
                        </div>
                        <div className={styles.col75}>
                            <input className={styles.inputTextBox}
                                type="text" id="firstName" key="firstName"
                                value={firstName}
                                placeholder="Insert first name"
                                onChange={(e) => setFirstName(e.target.value)} />
                            {/* {!isTextFieldValid && firstName == "" ? <p className={styles.invalidTextMessage}>Insert madatory field</p> : null} */}
                        </div>
                    </div>

                    <div className={`${styles.rowContainer}`}>
                        <div className={styles.col25}>
                            <label className={styles.labelForTextBox} for="lastName">Last Name</label>
                        </div>
                        <div className={styles.col75}>
                            <input className={styles.inputTextBox}
                                type="text" id="lastName" key="lastName"
                                value={lastName}
                                placeholder="Insert last name"
                                onChange={(e) => setLastName(e.target.value)} />
                            {/* {!isTextFieldValid && lastName == "" ? <p className={styles.invalidTextMessage}>Insert madatory field</p> : null} */}
                        </div>
                    </div>

                    <div className={`${styles.rowContainer}`}>
                        <div className={styles.col25}>
                            <label className={styles.labelForTextBox} for="email">Email</label>
                        </div>
                        <div className={styles.col75}>
                            <input className={styles.inputTextBox}
                                type="text" id="email" key="email"
                                value={email}
                                placeholder="Insert email"
                                onChange={(e) => setEmail(e.target.value)} />
                            {/* {!isTextFieldValid && email == "" ? <p className={styles.invalidTextMessage}>Insert madatory field</p> : null} */}
                        </div>
                    </div>

                    <div className={`${styles.rowContainer}`}>
                        <div className={styles.col25}>
                            <label className={styles.labelForTextBox} for="userType">User type</label>
                        </div>
                        <div className={styles.col75}>
                            <select name="userType" id="userType" onChange={(e) => setUserType(e.target.value)} value={userType}>
                                {
                                    listUserType.map((userTp) => (
                                        <option value={userTp}>{userTp}</option>
                                    ))
                                }

                            </select>
                            {/* {!isTextFieldValid && userType == "" ? <p className={styles.invalidTextMessage}>Select an option</p> : null} */}
                        </div>
                    </div>

                    <div className={styles.actionButtonContainer}>
                        <div className={styles.actionButtonContainer}>
                            <button className={`${styles.customButton} ${styles.backBtnStyle}`} onClick={handleBackButton}> Cancel </button>
                        </div>
                        <div className={styles.actionButtonContainer}>
                            <button className={`${styles.customButton} ${styles.saveBtnStyle} ${isLoading ? styles.btnDisabled : ''}`} onClick={handleSaveBtn} disabled={isLoading}>  {isLoading ? 'Editing...' : 'Edit'} </button>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    );


}

export default EditUser;

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
