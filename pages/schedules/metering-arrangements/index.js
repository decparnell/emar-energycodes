
import styles from "../../../styles/scenarioVariant.module.css";
import { useState, useContext, useEffect } from "react";
import SideNav from "../../../components/dashboardSideNav";
function MeteringArrangementsPage() {


    let panelDashboard = [{
        panelTitle: "Part A - General Provisions",
        dashboard: [{
            dashboardId: "BasicInformation",
            dashboardSectionName: "Basic Information",
            dashboardSectionOrder: 1,
        },
        {
            dashboardId: "DataItems",
            dashboardSectionName: "Data Items",
            dashboardSectionOrder: 2,
        },
        {
            dashboardId: "ScenarioVariants",
            dashboardSectionName: "Scenario Variants",
            dashboardSectionOrder: 3,
        }]

    },
    {
        panelTitle: "Part A - General Provisions1",
        dashboard: [{
            dashboardId: "BasicInformation1",
            dashboardSectionName: "Basic Information1",
            dashboardSectionOrder: 1,
        },
        {
            dashboardId: "DataItems1",
            dashboardSectionName: "Data Items1",
            dashboardSectionOrder: 2,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants1",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants13",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants11",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants12",
            dashboardSectionOrder: 3,
        }
        ]
    }, {
        panelTitle: "Part A - General Provisions1",
        dashboard: [{
            dashboardId: "BasicInformation1",
            dashboardSectionName: "Basic Information1",
            dashboardSectionOrder: 1,
        },
        {
            dashboardId: "DataItems1",
            dashboardSectionName: "Data Items1",
            dashboardSectionOrder: 2,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants1",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants13",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants11",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants12",
            dashboardSectionOrder: 3,
        }
        ]

    }, {
        panelTitle: "Part A - General Provisions1",
        dashboard: [{
            dashboardId: "BasicInformation1",
            dashboardSectionName: "Basic Information1",
            dashboardSectionOrder: 1,
        },
        {
            dashboardId: "DataItems1",
            dashboardSectionName: "Data Items1",
            dashboardSectionOrder: 2,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants1",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants13",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants11",
            dashboardSectionOrder: 3,
        },
        {
            dashboardId: "ScenarioVariants1",
            dashboardSectionName: "Scenario Variants12",
            dashboardSectionOrder: 3,
        }
        ]

    }];

    //Left Navigation Bar
    const [currentSections, setCurrentSections] = useState(() => {
        return panelDashboard[0];
    });

    useEffect(() => { }, [currentSections]);

    return (
        <div className={styles.container}>
            <div className={`${styles.sideNavContainer}`}>
                <SideNav
                    navbarType="PanelBasedNavBar"
                    items={panelDashboard}
                    dashboardId="dashboardId"
                    name="dashboardSectionName"
                    panelTitle="panelTitle"
                    dashboardName="dashboard"
                    stateVar={currentSections}
                    stateSet={setCurrentSections}
                />
            </div>
            <div className={`${styles.mainContentContainer}`}>
                <h3 className={styles.headers}>Metering Arrangements</h3>
                <div className={styles.tablesContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Doc version</th>
                                <th>Doc version1</th>
                                <th>Doc version2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DAta Doc version</td>
                                <td>data Doc version1</td>
                                <td>data Doc version2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.tablesContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Mandatory Part</th>
                                <th>Doc version1</th>
                                <th>Doc version2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mandatory Part</td>
                                <td>data Doc version1</td>
                                <td>data Doc version2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={`${styles.contentContainer} box`}>

                </div>
            </div>

        </div>
    )
}

export default MeteringArrangementsPage;