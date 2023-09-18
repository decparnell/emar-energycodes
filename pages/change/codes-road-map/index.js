import React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "../../../styles/change.module.css"
import sanitizeForUrl from "../../../components/helperFunctions/sanitizeForUrl";
import { useRouter } from "next/router";
// import sanitizeForUrl from "../../../components/helperFunctions/sanitizeForUrl";

function CodeRoadMapChange({ latestCodesRoadMapLinkJSON }) {

    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const [isValidUrl, setIsValidUrl] = useState(true);
    //const [isValidForm, setIsValidForm] = useState(isValidUrl);

    const downloadSpreadsheetLink = latestCodesRoadMapLinkJSON[0].link;

    const [spreadsheetLink, setSpreadsheetLink] = useState(downloadSpreadsheetLink);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSaveBtn = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 200); // Reset the click animation after 200 milliseconds
        //updateCodesRoadMapData();
    };

    const handleSpreadsheetLink = (e) => {
        const inputUrl = e.target.value;

        // Regular expression to validate a valid HTTP URL
        const urlPattern = /^(http|https):\/\/[^ "]+$/;

        // Check if the input URL matches the pattern
        if (urlPattern.test(inputUrl)) {
            setIsValidUrl(true);
            setSpreadsheetLink(inputUrl);
        } else {
            setIsValidUrl(false);
        }
    }


    async function updateCodesRoadMapData() {
        const putReqAPI = `https://prod-24.uksouth.logic.azure.com:443/workflows/6c470cc5be7346b8b05d26d8afc4de95/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tGzb7h9RoJKXH3nKE-rdg-KV80GpIxPrHuoM0ret6dE`;

        // Data to send in the PUT request
        const requestBody = {
            link: spreadsheetLink,
        };

        // Convert the request body to JSON
        const requestBodyJson = JSON.stringify(requestBody);

        const dataReq = await fetch(putReqAPI, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Specify JSON content type
          },
          body: requestBodyJson, // Include the JSON request body
        });

        const dataJson = await dataReq.json();
        if (dataJson.status != 200) {
            setErrorMessage("The update was not successful! Please try again");
        } else {
            setErrorMessage("");
            router.push("/change");
        }

    }


    return (
        <>
            <h1 className={styles.title}>The Code Road Map</h1>
            <div className={`${styles.changeContainer} box`}>
                <div className={styles.separtor} />
                <div className={`${styles.rowContainer}`}>
                    <div className={styles.col25}>
                        <label className={styles.labelForTextBox} for="roadmapLink">Spreadsheet roadmap link</label>
                    </div>
                    <div className={styles.col75}>
                        <input className={isValidUrl ? styles.inputTextBox : styles.invalidInputTextBox}
                            type="text" id="roadmapLink" key="roadmapLink"
                            placeholder="Insert roadmap URL link"
                            defaultValue={downloadSpreadsheetLink}
                            onChange={handleSpreadsheetLink} />
                        {!isValidUrl ? <p className={styles.invalidTextMessage}>Insert a valid URL</p> : null}
                    </div>
                </div>

                <div className={`${styles.rowContainer}`}>
                    <div className={styles.col25}>
                        <label className={styles.labelForTextBox} for="description">Description</label>
                    </div>
                    <div className={styles.col75}>
                        <textarea className={styles.inputTextBox}
                            defaultValue="The REC Code Roadmap provides a view of the key areas of strategic
                                    change that RECCo and the REC Code Manager will focus on over the
                                    next three years. These are areas of the REC where significant
                                    benefit could be gained for all REC stakeholders including
                                    consumers, within the long-term energy retail landscape."
                            type="text" id="description" key="description" placeholder="Insert roadmap description" />
                    </div>
                </div>
                <div className={styles.saveButtonContainer}>
                    <button className={isValidUrl ? `${styles.saveButton} ${isClicked ? styles.clicked : ''}` : `${styles.saveButton} ${styles.actionBtnDisabled}`}
                        onClick={handleSaveBtn}> Save </button>
                </div>
            </div>
        </>
    );
}

export default CodeRoadMapChange;

//This gets called on every request
export async function getServerSideProps({ req, res }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=20000, stale-while-revalidate=59"
    );

    //fetch data from external API
    const getLatestCodesRoadMapLink = await fetch(
        "https://prod-00.uksouth.logic.azure.com:443/workflows/6f41392a02a5439c94c9f97ca8228dff/triggers/request/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=lNXz4b-1HKJqWkpK9XFVdU4KsqzYRvhYZ5ZBjJtlgZI"
    );
    const latestCodesRoadMapLinkJSON = await getLatestCodesRoadMapLink.json();

    //Passing the data to the code-road-map page via props
    return {
        props: {
            latestCodesRoadMapLinkJSON,
        },
    };
}
