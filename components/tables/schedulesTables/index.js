import styles from "../../../styles/tables.module.css";
import Link from "next/link";

const SchedulesTables = (props) => {
    const tableId = props.tableId;
    const versions = props?.versions;
    const scheduleId = props?.scheduleId;
    const selectedVersion = props?.versionName;
    const parts = props?.parts;
    const mandatoryTable = props?.mandatoryTable;

    const VersionTable = (props) => {
        return (
            <table id="versionTable">
                <thead>
                    <tr>
                        <th>Version</th>
                        <th>Implementation Date</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.versions.map((version) => {
                            const { versionName, implementationDate, reason } = version;
                            return (
                                <Link
                                    href={{
                                        pathname: "/codes-schedules/[schedule_id]/[versionName]",
                                        query: { schedule_id: scheduleId, versionName: versionName },
                                    }}
                                    key={versionName}
                                    passHref={true}
                                >

                                    <tr
                                        className={`${selectedVersion == versionName ? styles.selected : ""}`}
                                        key={versionName}
                                    >
                                        <td
                                            className={`${selectedVersion == versionName ? styles.selected : ""
                                                }`}
                                        >
                                            {versionName ? versionName : "N/A"}
                                        </td>
                                        <td
                                            className={`${selectedVersion == versionName ? styles.selected : ""
                                                }`}
                                        >
                                            {implementationDate ? implementationDate : "N/A"}
                                        </td>
                                        <td
                                            className={`${selectedVersion == versionName ? styles.selected : ""
                                                }`}
                                        >
                                            {reason ? reason : "N/A"}
                                        </td>
                                    </tr>

                                </Link>
                            );
                        })
                    }
                </tbody>
            </table>
        )
    }


    const MandatoryTable = (props) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {props.parts.map((el, i) => {
                            return <th key={el.partId}>{el.partName}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {/* as per transformTable data structure first column is a key (optionality.ownersName) 
                        and the rest of columns are value array  */}
                    {Object.keys(props.mandatoryTable).map((el) => {
                        return (
                            <tr key={el.partsOwnersOptionalityId}>
                                <td>{el}</td>
                                {props.mandatoryTable[el].map((item, i) => (
                                    <td key={i}>{item}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }


    return (
        tableId == "Version Table" ?
            <VersionTable versions={versions} />
            :
            <MandatoryTable parts={parts} mandatoryTable={mandatoryTable} />
    )




}

export default SchedulesTables;