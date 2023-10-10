import { useState, useEffect } from "react";
import styles from "../../../styles/change.module.css"
import { customSortFunction } from "../../../components/helperFunctions/sortingFunction";
import Head from "next/head";
import SideNav from "../../../components/dashboardSideNav";
import DashboardLink from "../../../components/dashboardLink";
import { CustomBoxLink } from "../../../components/customComponents/customBoxLink";
import { useRouter } from "next/router";
import { AiFillLayout, AiFillProfile } from "react-icons/ai";
import { BiRightArrow, BiSolidRightArrow } from "react-icons/bi";

function SchedulesDashboard({ sections, items }) {

    const router = useRouter();
    const [dashboardTitle, setDashboardTitle] = useState("");
    const [dashboardLinkName, setDashboardLinkName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const ArrowIcon = isHovered ? BiSolidRightArrow : BiRightArrow;
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [currentSections, setCurrentSections] = useState(() => {
        return sections[0];
    });

    const [currentItems, setCurrentItems] = useState(() => {
        return items;
    });

    const [selectedIcon, setSelectedIcon] = useState("DashboardSections");
    const [selectedLinkItem, setSelectedLinkItem] = useState("");


    useEffect(() => {
        setDashboardTitle(currentSections.dashboardSectionName);
    }, [currentSections]);


    const handleSaveBtn = () => {
        console.log(dashboardTitle);
    };

    const handleBackButton = () => {
        router.push("/change");
    };

    const handleIconClick = (target) => {
        setSelectedIcon(target);
    }

    const handleItemSelection = (item) => {
        console.log(item);
        setDashboardLinkName(item.dashboardSectionItemsName)
        setSelectedLinkItem(item);
    }

    const DashboardSectionEdit = () => {
        return (
            <>
                <h6 className="boxTitle">{currentSections.dashboardSectionName}</h6>
                <div className={`${styles.columnContainer}`}>
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
                            value={dashboardTitle}
                            placeholder="Insert dashboard name"
                            onChange={(e) => setDashboardTitle(e.target.value)} />
                    </div>
                </div>
            </>
        )
    }

    const DashboardLinksEdit = () => {
        return (
            <>
                <h6 className="boxTitle">Dashboard Links</h6>
                <div className={`${styles.columnContainer}`}>
                    <div className={styles.col100}>
                        <label className={styles.dashboradLabelForTextBox} for="dashboardLinkName">Dashboard Link Name:</label>
                    </div>
                    <div className={styles.col100}>
                        <input className={styles.dashboardInputTextBoxEdit}
                            type="text" id="dashboardLinkName" key="dashboardLinkName"
                            value={dashboardLinkName}
                            placeholder="Insert dashboard name"
                            onChange={(e) => setDashboardLinkName(e.target.value)} />
                    </div>
                </div>
            </>
        )
    }

    const DashboardLinks = () => {
        return currentItems.map((item, id) => {
            return (
                <div className={styles.dashboardItemsPanel} onClick={() => handleItemSelection(item)}>
                    <CustomBoxLink href={""} id={`dashboardLink_${id}`}>
                        {item.dashboardSectionItemsName}
                    </CustomBoxLink>
                </div>
            )
        });
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
                                <>
                                    <h6 className="boxTitle">{currentSections.dashboardSectionName}</h6>
                                    <div className={`${styles.columnContainer}`}>
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
                                                value={dashboardTitle}
                                                placeholder="Insert dashboard name"
                                                onChange={(e) => setDashboardTitle(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h6 className="boxTitle">Dashboard Links</h6>
                                    <div className={`${styles.columnContainer}`}>
                                        <div className={styles.col100}>
                                            <label className={styles.dashboradLabelForTextBox} for="dashboardLinkName">Dashboard Link Name:</label>
                                        </div>
                                        <div className={styles.col100}>
                                            <input className={styles.dashboardInputTextBoxEdit}
                                                type="text" id="dashboardLinkName" key="dashboardLinkName"
                                                value={dashboardLinkName}
                                                placeholder="Insert dashboard name"
                                                onChange={(e) => setDashboardLinkName(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className={`${styles.actionButtonContainer} ${styles.actionButtonContainerDashboard}`}>
                                <div lassName={styles.col50}>
                                    <button className={`${styles.customButton} ${styles.backBtnStyle} ${styles.dashboardEditButtons}`} onClick={handleBackButton}> Cancel </button>
                                </div>
                                <div lassName={styles.col50}>
                                    <button className={`${styles.customButton} ${styles.saveBtnStyle} ${styles.dashboardEditButtons} ${isLoading ? styles.btnDisabled : ''}`} onClick={handleSaveBtn} disabled={isLoading}>  {isLoading ? 'Editing...' : 'Edit'} </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SchedulesDashboard;

// This gets called on every request
export async function getServerSideProps({ req, res }) {
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=20000, stale-while-revalidate=59"
    );

    // Fetch data from external API
    const dataReq = await fetch(
        `https://prod-04.uksouth.logic.azure.com/workflows/4db80aa335be4311b0a1a8d80cc7c504/triggers/manual/paths/invoke/Schedules?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rzSvBbeSA3spIYX1gDBk10Bam3XBduOo5vvY1kYYLPA`
    );
    const dataJson = await dataReq.json();
    const sections = dataJson.sections;
    const lastDashboardSectionOrder =
        sections[sections.length - 1].dashboardSectionOrder + 1;
    sections.push({
        dashboardId_FK: null,
        dashboardSectionId: null,
        dashboardSectionName: "All",
        dashboardSectionOrder: lastDashboardSectionOrder,
    });
    const itemsUnsorted = dataJson.items;
    const items = itemsUnsorted.sort((a, b) => customSortFunction(a, b, "dashboardSectionItemsName"));

    /*   const newsDataReq = await fetch(
      "https://prod-22.uksouth.logic.azure.com:443/workflows/e36d26ad83b04a86bc67b618e20c9dc5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Zymwu40i_cJZuIQhxAW9VZeDw22xzO97ie4sApLfizU"
    );
    const latestNewsJson = await newsDataReq.json();
    const newsData = latestNewsJson.latestNews; */
    // Pass data to the page via props
    return {
        props: {
            sections,
            items,
        },
    };
}
