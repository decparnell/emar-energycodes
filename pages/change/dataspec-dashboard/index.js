import { useState, useEffect } from "react";
import styles from "../../../styles/change.module.css"
import { customSortFunction } from "../../../components/helperFunctions/sortingFunction";
import Head from "next/head";
import SideNav from "../../../components/dashboardSideNav";
import Modal from "../../../components/modal/index.js"
import { CustomBoxLink } from "../../../components/customComponents/customBoxLink";
import { useRouter } from "next/router";
import { AiFillLayout, AiFillProfile } from "react-icons/ai";


function DataSpecDashboard({ sections, items }) {


    
    const router = useRouter();
    const [dashboardSectionId, setDashboardId] = useState("");
    const [dashboardSectionName, setDashboardName] = useState("");
    const [selectedLinkItem, setSelectedLinkItem] = useState("");
    const [dashboardLinkName, setDashboardLinkName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("DashboardSections");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentSections, setCurrentSections] = useState(() => {
        return sections[0];
    });

    const [currentItems, setCurrentItems] = useState(() => {
        return items;
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleYesClick = () => {
        handleSaveBtn();
    };


    useEffect(() => {
        setDashboardId(currentSections.dashboardSectionId);
        setDashboardName(currentSections.dashboardSectionName);
    }, [currentSections]);


    const handleSaveBtn = () => {
        if (selectedIcon == "DashboardSections") {
            if (dashboardSectionName !== "") {
                updateDashboardSection();
            }
        } else if(selectedIcon == "DashboardLink" ){
            if (dashboardLinkName !== "") {
                unpdateDashboardLinks()
            }
        }
    };

    const handleBackButton = () => {
        router.push("/change");
    };

    const handleIconClick = (target) => {
        setSelectedIcon(target);
    }

    const handleDashboardLinkItemSelection = (item) => {
        setDashboardLinkName(item.dashboardSectionItemsName);
        setSelectedLinkItem(item);
    }

    const confirmationModal = (
        <Modal modalType={"CustomModal"} open={isModalOpen} onClose={closeModal}>
            <div>
                <p className={styles.confirmationModalText}>Are you sure you want to proceed?</p>
                <button onClick={handleYesClick} className={`${styles.customYesNoButton} ${styles.saveBtnStyle}`}>Yes</button>
                <button onClick={closeModal} className={`${styles.customYesNoButton} ${styles.removeBtnStyle}`}>No</button>
            </div>
        </Modal>
    );

    const DashboardLinks = () => {
        return currentItems.map((item, id) => {
            return (
                <div className={styles.dashboardItemsPanel} onClick={() => handleDashboardLinkItemSelection(item)}>
                    <CustomBoxLink href={""} id={`dashboardLink_${id}`}>
                        {item.dashboardSectionItemsName}
                    </CustomBoxLink>
                </div>
            )
        });
    }

    function updateDashboardSection() {
        //LogicApp: updateDashboardSectionName
        const postReqAPI = `https://prod-24.uksouth.logic.azure.com:443/workflows/4f2dc3bde2834a878b294b0c045ec8f2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pZO5jzJ7zlYxG6Ht6HyhkSB2kkDtHRJZe1eA9ja4ss8`;

        const requestBody = {
            dashboardSectionId: dashboardSectionId,
            dashboardSectionName: dashboardSectionName,
        };

        sendRequest(postReqAPI,requestBody)
        
    }

    function unpdateDashboardLinks() {
        //LogicApp: udpateDashboardSectionItemName
        const postReqAPI = `https://prod-11.uksouth.logic.azure.com:443/workflows/e28446f0ed6645f481d98752e579dc5a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=R2r1mBHPByuF3UVd6JC9H5Tf0X4aKGYzlMDYZfIc9tM`;

        const requestBody = {
            dashboardSectionsItemsId: selectedLinkItem.dashboardSectionsItemsId,
            dashboardSectionItemsName: dashboardLinkName,
        };

        sendRequest(postReqAPI,requestBody)
    }

    async function sendRequest(postReqAPI,requestBody){
        setIsLoading(true);
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
            setErrorMessage("Update not successful! Please try again");
        } else {
            setErrorMessage("");
            router.push("/change");
        }
    }

    return (
        <>
            <div className={"container-flex"}>
                <Head>
                    <title>Edit Schedules Dashboard</title>
                    <meta property="og:title" content="My page title" key="title" />
                </Head>
                <div className={`side-nav-container ${selectedIcon == "DashboardLink" ? styles.blur : ''}`}>
                    <SideNav
                        items={sections}
                        name="dashboardSectionName"
                        stateVar={currentSections}
                        stateSet={setCurrentSections}
                    />
                </div>
                <div className={styles.mainContentContainer}>
                    <div className={styles.top}>
                        <div className={`${styles.left} ${selectedIcon == "DashboardSections" ? styles.blur : ''} box`}>
                            <h6 className="boxTitle">Dashboard Links</h6>
                            <DashboardLinks />
                        </div>
                        <div className={`${styles.right} box`}>
                            <div className={`${styles.subNavBarContainer}`}>
                                <div className={styles.iconDashboardContainer}>
                                    <div className={styles.dashboardNavIcons} onClick={() => handleIconClick("DashboardSections")}>
                                        <AiFillLayout className={`${styles.dashboardScheduleIcon} ${selectedIcon == "DashboardSections" ? styles.iconSelected : ''}`} />
                                    </div>
                                    <div className={styles.dashboardNavIcons} onClick={() => handleIconClick("DashboardLink")}>
                                        <AiFillProfile className={`${styles.dashboardScheduleIcon} ${selectedIcon == "DashboardLink" ? styles.iconSelected : ''}`} />
                                    </div>
                                </div>
                            </div>
                            {selectedIcon == "DashboardSections" ? (
                                <div className={`${styles.columnContainer}`}>
                                    <h6 className="boxTitle">{currentSections.dashboardSectionName}</h6>
                                    <div className={`${styles.rowContainerDashboard}`}>
                                        <div className={styles.col25}>
                                            <label className={styles.dashboradLabelForTextBox} for="SectionOrder">Section Order:</label>
                                        </div>
                                        <div className={styles.col25}>
                                            <label className={styles.dashboradLabelForTextBox} for="SectionOrder">{currentSections.dashboardSectionOrder}</label>
                                        </div>
                                    </div>
                                    <div className={styles.col100}>
                                        <label className={styles.dashboradLabelForTextBox} for="DashboardName">Dashboard Name:</label>
                                    </div>
                                    <div className={styles.col100}>
                                        <input className={styles.dashboardInputTextBoxEdit}
                                            type="text" id="DashboardName" key="DashboardName"
                                            value={dashboardSectionName}
                                            placeholder="Insert dashboard name"
                                            onChange={(e) => setDashboardName(e.target.value)} />
                                    </div>
                                </div>
                            ) : (
                                <div className={`${styles.columnContainer}`}>
                                    <h6 className="boxTitle">Dashboard Links</h6>
                                    <div className={styles.col100}>
                                        <label className={styles.dashboradLabelForTextBox} for="dashboardLinkName">Dashboard Link Name:</label>
                                    </div>
                                    <div className={styles.col100}>
                                        <input className={styles.dashboardInputTextBoxEdit}
                                            type="text" id="dashboardLinkName" key="dashboardLinkName"
                                            value={dashboardLinkName}
                                            placeholder="Insert dashboard name"
                                            onChange={(e) => setDashboardLinkName(e.target.value)} 
                                            disabled={dashboardLinkName==""}/>
                                    </div>
                                </div>
                            )}
                            <div className={`${styles.actionButtonContainer} ${styles.actionButtonContainerDashboard}`}>
                                <div lassName={styles.col50}>
                                    <button className={`${styles.customButton} ${styles.backBtnStyle} ${styles.dashboardEditButtons}`} onClick={handleBackButton}> Cancel </button>
                                </div>
                                <div lassName={styles.col50}>
                                    <button className={`${styles.customButton} ${styles.saveBtnStyle} ${styles.dashboardEditButtons} ${selectedIcon == "DashboardLink" && dashboardLinkName== "" ? styles.btnDisabled : ''} ${isLoading ? styles.btnDisabled : ''}`} onClick={selectedIcon == "DashboardLink" && dashboardLinkName== "" ? null : openModal} disabled={isLoading}>  {isLoading ? 'Editing...' : 'Edit'} </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {confirmationModal}
            </div>
        </>
    );
}

export default DataSpecDashboard;

// This gets called on every request
export async function getServerSideProps({ req, res }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=20000, stale-while-revalidate=59"
    );

    // Fetch data from external API
    const dataReq = await fetch(
        `https://prod-27.uksouth.logic.azure.com/workflows/770ce28ce1074e7a96d13a406ce99831/triggers/manual/paths/invoke/Data Specification?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DO-zRnu41uwoxxvLpyyg2YabBT9cs-He2yKN_U9wiCE`
    );
    const dataJson = await dataReq.json();
    const sections = dataJson.sections;
    const itemsUnsorted = dataJson.items;
    const items = itemsUnsorted.sort((a, b) => customSortFunction(a, b, "dashboardSectionItemsName"));


    // Pass data to the page via props
    return {
        props: {
            sections,
            items,
        },
    };
}