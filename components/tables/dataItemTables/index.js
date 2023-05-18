import removeNullValues from "../../dataspec/functions/removeNulls";
import styles from "../../../styles/tables.module.css";
import Link from "next/link";

const DataItemTables = (props) => {
    const keyTitle = props.keyTitle;
    const latestDataSpecVersion = props.latestDataSpecVersion;
    const dataBody = props.dataBody;
    const legacy = props.legacy ? props.legacy : null


    //Title Request Metering System tables
    const BasicInfoTables = (props) => {
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
                            <th>Data Type</th>
                        </tr>
                        <tr>
                            <td>{props.dataItemInfo.DataTypeFormatName ? props.dataItemInfo.DataTypeFormatName : "NA"}</td>
                        </tr>
                    </table>
                    <table className={styles.customTableHeader}>
                        <tr>
                            <th>Owner</th>
                        </tr>
                        <tr>
                            <td>{props.dataItemInfo.MarketRoleDataServiceName ? props.dataItemInfo.MarketRoleDataServiceName : "NA"}</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.notesTable}>
                    <table>
                        <tr>
                            <th className={styles.customTableHeader}>Description</th>
                            <td className={styles.customTableData}>{props.dataItemInfo.DataItemDefinition ? props.dataItemInfo.DataItemDefinition : "NA"}</td>
                        </tr>
                        <tr>
                            <th className={styles.customTableHeader}>Logical Length</th>
                            <td className={styles.customTableData}>{props.dataItemInfo.DataItemLogicalLength ? props.dataItemInfo.DataItemLogicalLength : "NA"}</td>
                        </tr>
                        <tr>
                            <th className={styles.customTableHeader}>Logical Decimal Length</th>
                            <td className={styles.customTableData}>{props.dataItemInfo.DataItemLogicalDecimalLength ? props.dataItemInfo.DataItemLogicalDecimalLength : "NA"}</td>
                        </tr>
                        <tr>
                            <th className={styles.customTableHeader}>Physical Length</th>
                            <td className={styles.customTableData}>{props.dataItemInfo.DataItemPhysicalLength ? props.dataItemInfo.DataItemPhysicalLength : "NA"}</td>
                        </tr>
                        <tr>
                            <th className={styles.customTableHeader}>Data Type Format Rule</th>
                            <td className={styles.customTableData}>{props.dataItemInfo.DataTypeFormatRuleName ? props.dataItemInfo.DataTypeFormatRuleName : "NA"}</td>
                        </tr>
                        <tr>
                            <th>Notes</th>
                            <td>{props.dataItemInfo.ExternalNotes ? props.dataItemInfo.ExternalNotes : "NA"}</td>
                        </tr>
                    </table>
                </div>
            </section>
        )
    }

    const DataEnumerationsTable = (props) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Enumeration Value</th>
                        <th>Enumeration Description</th>
                    </tr>
                </thead>
                <tbody>
                    {props.dataEnumerations.map((entry) => (
                        <tr key={entry.EnumerationValue}>
                            <td>{entry.EnumerationValue}</td>
                            <td>{entry.EnumerationDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }


    const MarketMessageTable = (props) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Market Message Id</th>
                        <th>Local Catalogue Reference</th>
                        <th>Market Message Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.mmForDataItem.map((entry) => (
                        <Link
                            key={entry.EnergyMarketMessageIdentifier}
                            href={{
                                pathname: `/dataspec/${latestDataSpecVersion}/marketmessage/[mmid]`,
                                query: {
                                    mmid: entry.EnergyMarketMessageIdentifier,
                                },
                            }}
                        >
                            <tr
                                key={entry.EnergyMarketMessageIdentifier}
                                className={styles.pointer}
                            >
                                <td>{entry.EnergyMarketMessageIdentifier}</td>
                                <td>
                                    {removeNullValues(entry.DTCDcode) +
                                        removeNullValues(
                                            entry.LegacyRGMAMessageIdentifier
                                        ) +
                                        removeNullValues(
                                            entry.LegacySPAAMessageIdentifier
                                        ) +
                                        removeNullValues(entry.UNCMessageIdentifier) +
                                        removeNullValues(entry.CSSMessageIdentifier)}
                                </td>
                                <td>{entry.Label}</td>
                            </tr>
                        </Link>
                    ))}
                </tbody>
            </table>
        )
    }



    const DITables = (props) => {
        switch (props.k) {
            case "Basic Information":
                return <BasicInfoTables dataItemInfo={dataBody} legacy={legacy} />
            case "Data Enumerations":
                return <DataEnumerationsTable dataEnumerations={dataBody} />
            case "Market Messages":
                return <MarketMessageTable mmForDataItem={dataBody} />
            default:
                return <div className={styles.headers}>Table not found</div>;
        }
    }


    return (

        keyTitle == "Basic Information" ?
            <div className={styles.infoTable}>
                <h1 className={styles.headers}>{dataBody.DataItemIdentifier} - {" "}
                    {dataBody.DataItemName}</h1>
                <DITables k={keyTitle} />
            </div>
            : <>
                {dataBody.length > 0 ? <div className={styles.infoTable}>
                    <h3 className={styles.headers}>{keyTitle}</h3>
                    <DITables k={keyTitle} />
                </div> : null}
            </>
    )
}

export default DataItemTables;