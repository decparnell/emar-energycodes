import React from "react";
import Head from "next/head";
import styles from "../../styles/change.module.css"
import { useState, useEffect, useContext } from "react";
import SideNav from "../../components/dashboardSideNav";
import ChangeDashboard from "../../components/changeDashboard";


function Change({ }) {

    let changeDashboard = [
        {
            dashboardId: "ChangeDashboard",
            dashboardName: "Change Dashboard",
            dashboardLink: "",
            dashboardOrder: 1,
        },
        {
            dashboardId: "Schedules",
            dashboardName: "Schedules",
            dashboardLink: "",
            dashboardOrder: 2,
        },
        {
            dashboardId: "SchedulesDashboard",
            dashboardName: "Schedules Dashboard",
            dashboardLink: "/schedules-dashboard",
            dashboardOrder: 3,
        },
        {
            dashboardId: "DataSpecification",
            dashboardName: "Data Specification",
            dashboardLink: "",
            dashboardOrder: 4,
        },
        {
            dashboardId: "DataSpecificationDashboard",
            dashboardName: "Data Specification Dashboard",
            dashboardLink: "",
            dashboardOrder: 5,
        },
        {
            dashboardId: "CodesRoadMap",
            dashboardName: "Codes Road Map",
            dashboardLink: "/codes-road-map",
            dashboardOrder: 6,
        },
        {
            dashboardId: "ReleaseManagement",
            dashboardName: "Release Management",
            dashboardLink: "",
            dashboardOrder: 7,
        }
    ];

    const [currentSections, setCurrentSections] = useState(() => {
        return changeDashboard[0];
    });

    return (
        <>
            <div className={"container-flex"}>
                <Head>
                    <title>EMAR Change Settings</title>
                    <meta property="og:title" content="My page title" key="title" />
                </Head>
                <div className={"side-nav-container"}>
                    <SideNav
                        navbarType="LinkBasedNavBar"
                        items={changeDashboard}
                        name="dashboardName"
                        stateVar={currentSections}
                        stateSet={setCurrentSections}
                    />
                </div>
                {currentSections.dashboardId === "ChangeDashboard" ? <ChangeDashboard /> : null}
            </div>
        </>
    );

}

export default Change;