import React from "react";
import { useState } from "react";
import styles from "../../../styles/change.module.css"
import { useRouter } from "next/router";

function AddNewUser(props) {

    const router = useRouter();
    const [userId, setUserId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");

    const [isTextFieldValid, setIsTextFieldValid] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");



    const handleSaveBtn = () => {
        const checkIsValid = firstName !== "" && lastName !== "" && email !== "" && userType !== ""
        if (checkIsValid) {
            setIsTextFieldValid(checkIsValid);
            insertNewUser();
        } else {
            setIsTextFieldValid(checkIsValid);
        }
    };

    async function insertNewUser() {
        const postReqAPI = `https://prod-22.uksouth.logic.azure.com:443/workflows/0422dd71013b44b7b7cb6244e5fbe12c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SNwxzsNd8JMFCe7gyJLHSSQw9wjAztD1TzS7em293u4`;

        // Data to send in the PUT request
        const requestBody = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userType: userType
        };

        // Convert the request body to JSON
        const requestBodyJson = JSON.stringify(requestBody);

        const dataReq = await fetch(postReqAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBodyJson,
        });

        const dataJson = await dataReq.json();
        if (dataJson.status != 200) {
            setErrorMessage("User not created! Please try again");
        } else {
            setErrorMessage("");
            router.push("/change");
        }
    }

    return (
        <>
            <h1 className={styles.title}>Create New User</h1>
            <div className={`${styles.changeContainer} box`}>
                <div className={styles.separtor} />
                <div className={`${styles.rowContainer}`}>
                    <div className={styles.col25}>
                        <label className={styles.labelForTextBox} for="firstName">First Name</label>
                    </div>
                    <div className={styles.col75}>
                        <input className={styles.inputTextBox}
                            type="text" id="firstName" key="firstName"
                            placeholder="Insert first name"
                            onChange={(e) => setFirstName(e.target.value)} />
                        {!isTextFieldValid && firstName == "" ? <p className={styles.invalidTextMessage}>Insert madatory field</p> : null}
                    </div>
                </div>

                <div className={`${styles.rowContainer}`}>
                    <div className={styles.col25}>
                        <label className={styles.labelForTextBox} for="lastName">Last Name</label>
                    </div>
                    <div className={styles.col75}>
                        <input className={styles.inputTextBox}
                            type="text" id="lastName" key="lastName"
                            placeholder="Insert last name"
                            onChange={(e) => setLastName(e.target.value)} />
                        {!isTextFieldValid && lastName == "" ? <p className={styles.invalidTextMessage}>Insert madatory field</p> : null}
                    </div>
                </div>

                <div className={`${styles.rowContainer}`}>
                    <div className={styles.col25}>
                        <label className={styles.labelForTextBox} for="email">Email</label>
                    </div>
                    <div className={styles.col75}>
                        <input className={styles.inputTextBox}
                            type="text" id="email" key="email"
                            placeholder="Insert email"
                            onChange={(e) => setEmail(e.target.value)} />
                        {!isTextFieldValid && email == "" ? <p className={styles.invalidTextMessage}>Insert madatory field</p> : null}
                    </div>
                </div>

                <div className={`${styles.rowContainer}`}>
                    <div className={styles.col25}>
                        <label className={styles.labelForTextBox} for="userType">User type</label>
                    </div>
                    <div className={styles.col75}>
                        <select name="userType" id="userType" onChange={(e) => setUserType(e.target.value)}>
                            <option value="Admin">Admin</option>
                            <option value="Change User">Change User</option>
                        </select>
                        {!isTextFieldValid && userType == "" ? <p className={styles.invalidTextMessage}>Select an option</p> : null}
                    </div>
                </div>

                <div className={styles.saveButtonContainer}>
                    <button className={styles.saveButton} onClick={handleSaveBtn}> Create </button>
                </div>
            </div>
        </>
    );
}

export default AddNewUser;