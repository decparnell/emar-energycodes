import styles from "../../../styles/tables.module.css";
import removeNullValues from "../../dataspec/functions/removeNulls";
import addPaddingToGroupId from "../../../components/dataspec/functions/addIdPadding";
import Link from "next/link";
import CreateFlowStructure from "../../../components/dataspec/createFlowStructure";
import { AiOutlineArrowRight } from "react-icons/ai";

const ScenarioVariantTables = (props) => {
  const keyTitle = props.keyTitle;
  const latestDataSpecVersion = props.latestDataSpecVersion;
  const dataBody = props.dataBody;

  //Request Metering System tables
  const BaseInfomation = (props) => {
    return (
      <section>
        <div className={styles.tables}>
          <table className={styles.basicInformation}>
            <thead>
              <tr>
                <th>Legacy Reference/s</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.svInfo.DTCDcode}</td>
              </tr>
            </tbody>
          </table>
          <table className={styles.basicInformation}>
            <thead>
              <tr>
                <th>Message Version</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {addPaddingToGroupId(props.svInfo.MessageVersionNumber)}
                </td>
              </tr>
            </tbody>
          </table>
          <table className={styles.basicInformation}>
            <thead>
              <tr>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {props.svInfo.OwnerName ? props.svInfo.OwnerName : "NA"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.notesTable}>
          <table>
            <tbody>
              <tr>
                <td className={styles.customTableHeader}>Description</td>
                <td className={styles.customTableData}>
                  {props.svInfo.EnergyMarketMessageScenarioVariantDescription
                    ? props.svInfo.EnergyMarketMessageScenarioVariantDescription
                    : "NA"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  const StructureTable = (props) => {
    return CreateFlowStructure(props.svStructure);
  };

  const SVTables = (props) => {
    switch (props.k) {
      case "Basic Information":
        return <BaseInfomation svInfo={dataBody} />;
      case "Structure":
        return <StructureTable svStructure={dataBody} />;
      default:
        return <div className={styles.headers}>Table not found</div>;
    }
  };

  return keyTitle === "Basic Information" ? (
    <div className={styles.infoTable}>
      <h1 className={styles.headers}>
        {dataBody.EnergyMarketMessageScenarioVariantIdentifier} -{" "}
        {dataBody.EnergyMarketMessageScenarioVariantName} {" ("}{" "}
        {dataBody.EnergyMarketMessageIdentifier} - {dataBody.DTCDcode} {")"}{" "}
      </h1>
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
    </div>
  ) : (
    <div className={styles.infoTable}>
      <h3 className={styles.headers}>{keyTitle}</h3>
      <SVTables k={keyTitle} />
    </div>
  );
};

export default ScenarioVariantTables;
