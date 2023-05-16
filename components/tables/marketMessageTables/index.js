import removeNullValues from "../../dataspec/functions/removeNulls";
import styles from "../../../styles/tables.module.css";
import addPaddingToGroupId from "../../../components/dataspec/functions/addIdPadding";
import Link from "next/link";

const MarketMessageTables = (props) => {
    const keyTitle = props.keyTitle;
    const latestDataSpecVersion = props.latestDataSpecVersion;
    const dataBody = props.dataBody;
    const showApiColumns = props.showApiColumns ? props.showApiColumns : null;
    const legacy = props.legacy ? props.legacy : null


    //Title Request Metering System tables
    const TitleRqstMeteringSysTables = (props) => {
        return (
            <section>
                <div className={styles.tables}>
                    <table className={styles.customTableHeader}>
                        <tr>
                            <th>Legacy Reference/s</th>
                        </tr>
                        <tr>
                            <td>{removeNullValues(props.legacy)}</td>
                        </tr>
                    </table>
                    <table className={styles.customTableHeader}>
                        <tr>
                            <th>Message Version</th>
                        </tr>
                        <tr>
                            <td>{addPaddingToGroupId(
                                props.marketMessageInfo.MessageVersionNumber
                            )}</td>
                        </tr>
                    </table>
                    <table className={styles.customTableHeader}>
                        <tr>
                            <th>Owner</th>
                        </tr>
                        <tr>
                            <td>Owner</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.notesTable}>
                    <table>
                        <tr>
                            <th className={styles.customTableHeader}>Description</th>
                            <td className={styles.customTableData}>{props.marketMessageInfo.Description}</td>
                        </tr>
                        <tr>
                            <th>Notes</th>
                            <td>{props.marketMessageInfo.ExternalNotes}</td>
                        </tr>
                    </table>
                </div>
            </section>
        )
    }


    const DataItemsTable = (props) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Data Item Id</th>
                        <th>Legacy Reference/s</th>
                        <th>Data Item Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.dataItems.map((entry) => (
                        <Link
                            key={entry.DataItemIdentifier}
                            href={{
                                pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[di]`,
                                query: {
                                    di: entry.DataItemIdentifier,
                                },
                            }}
                            passHref={true}
                        >
                            <tr>
                                <td>{entry.DataItemIdentifier}</td>
                                <td>
                                    {/* if there is a null value , it replaces it with "" */}
                                    {removeNullValues(entry.DTCLegacyReference) +
                                        removeNullValues(entry.SPAALegacyReference) +
                                        removeNullValues(entry.RGMALegacyReference) +
                                        removeNullValues(entry.UNCDataItemReference) +
                                        removeNullValues(entry.IUCDataItemReference) +
                                        removeNullValues(entry.DCUSADataItemReference)}
                                </td>
                                <td>{entry.DataItemName}</td>
                            </tr>
                        </Link>
                    ))}
                </tbody>
            </table>
        )
    }

    const ScenarioVariantTable = (props) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Variant Id</th>
                        <th>Name</th>
                        <th>Source</th>
                        <th>Target</th>
                        {showApiColumns ? (
                            <>
                                <th>API Method</th>
                                <th>API Route</th>
                            </>
                        ) : null}
                    </tr>
                </thead>
                <tbody>
                    {props.svForMarketMessage.map((entry) => (
                        <Link
                            key={entry.EnergyMarketMessageScenarioVariantIdentifier}
                            href={{
                                pathname: `/dataspec/${latestDataSpecVersion}/scenario-variant/[sv]`,
                                query: {
                                    sv: entry.EnergyMarketMessageScenarioVariantIdentifier,
                                },
                            }}
                            passHref={true}
                        >
                            <tr
                                key={entry.EnergyMarketMessageScenarioVariantIdentifier}
                            >
                                <td>
                                    {entry.EnergyMarketMessageScenarioVariantIdentifier}
                                </td>
                                <td>{entry.EnergyMarketMessageScenarioVariantName}</td>
                                <td>{entry.SourceMarketDataServiceName}</td>
                                <td>{entry.TargetMarketDataServiceName}</td>
                                {entry.ApiMethod ? <td>{entry.ApiMethod}</td> : null}
                                {entry.ApiRoute ? <td>{entry.ApiRoute}</td> : null}
                            </tr>
                        </Link>
                    ))}
                </tbody>
            </table>
        )
    }



    const MMTables = (props) => {
        switch (props.k) {
            case "Basic Information":
                return <TitleRqstMeteringSysTables marketMessageInfo={dataBody} legacy={legacy} />
            case "Data Items":
                return <DataItemsTable dataItems={dataBody} />
            case "Scenario Variant":
                return <ScenarioVariantTable svForMarketMessage={dataBody} showApiColumns={showApiColumns} />
            default:
                return <div className={styles.headers}>Table not found</div>;
        }
    }


    return (
        keyTitle === "Basic Information" ?
            <div className={styles.infoTable}>
                <h1 className={styles.headers}>{dataBody.EnergyMarketMessageIdentifier} - {" "}
                    {dataBody.Label}</h1>
                <MMTables k={keyTitle} />
            </div> :
            <div className={styles.infoTable}>
                <h3 className={styles.headers}>{keyTitle}</h3>
                <MMTables k={keyTitle} />
            </div>
    )
}

export default MarketMessageTables;