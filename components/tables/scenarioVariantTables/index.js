import styles from "../../../styles/tables.module.css";
import removeNullValues from "../../dataspec/functions/removeNulls";
import addPaddingToGroupId from "../../../components/dataspec/functions/addIdPadding";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

const ScenarioVariantTables = (props) => {
    const keyTitle = props.keyTitle;
    const latestDataSpecVersion = props.latestDataSpecVersion;
    const dataBody = props.dataBody;

    //Request Metering System tables
    const RqstMeteringSysTables = (props) => {
        return (
            <section>
                <div className={styles.tables}>
                    <table className={styles.customTableHeader}>
                        <tr>
                            <th>Legacy Reference/s</th>
                        </tr>
                        <tr>
                            <td>{props.svInfo.DTCDcode}</td>
                        </tr>
                    </table>
                    <table className={styles.customTableHeader}>
                        <tr>
                            <th>Message Version</th>
                        </tr>
                        <tr>
                            <td>{addPaddingToGroupId(
                                props.svInfo.MessageVersionNumber
                            )}</td>
                        </tr>
                    </table>
                    <table className={styles.customTableHeader}>
                        <tr>
                            <th>Owner</th>
                        </tr>
                        <tr>
                            <td>{props.svInfo.OwnerName ? props.svInfo.OwnerName : "NA"}</td>
                        </tr>
                    </table>
                </div>
                <div className={styles.notesTable}>
                    <table>
                        <tr>
                            <th className={styles.customTableHeader}>Description</th>
                            <td className={styles.customTableData}>{props.svInfo.EnergyMarketMessageScenarioVariantDescription ? props.svInfo.EnergyMarketMessageScenarioVariantDescription : "NA"}</td>
                        </tr>
                        <tr>
                            <th>Notes</th>
                            <td>Notes</td>
                        </tr>
                    </table>
                </div>
            </section>
        )
    }

    const StructureTable = (props) => {
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
                    {props.svStructure.map((entry) => (
                        <Link
                            key={entry.EnergyMarketDataItemIdentifier}
                            href={{
                                pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[di]`,
                                query: {
                                    di: entry.EnergyMarketDataItemIdentifier,
                                },
                            }}
                            passHref={true}
                        >
                            <tr>
                                <td>{entry.EnergyMarketDataItemIdentifier}</td>
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



    const SVTables = (props) => {
        switch (props.k) {
            case "Basic Information":
                return <RqstMeteringSysTables svInfo={dataBody} />
            case "Structure":
                return <StructureTable svStructure={dataBody} />
            default:
                return <div className={styles.headers}>Table not found</div>;
        }
    }


    return (
        keyTitle === "Basic Information" ?
            <div className={styles.infoTable}>
                <h1 className={styles.headers}>{dataBody.EnergyMarketMessageScenarioVariantIdentifier} - {" "}
                    {dataBody.EnergyMarketMessageScenarioVariantName} {" ("} {dataBody.EnergyMarketMessageIdentifier} - {dataBody.DTCDcode} {")"} </h1>
                <SVTables k={keyTitle} />

                <div className={styles.sourcetargetContainer}>
                    <div className={styles.source}>
                        <p>{dataBody.SourceName}</p>
                    </div>
                    <AiOutlineArrowRight className={styles.sourceArrowTarget} />
                    <div className={styles.target}>
                        <p>{dataBody.TargetName}</p>
                    </div>
                </div>
            </div> :
            <div className={styles.infoTable}>
                <h3 className={styles.headers}>{keyTitle}</h3>
                <SVTables k={keyTitle} />
            </div>
    )
}

export default ScenarioVariantTables;