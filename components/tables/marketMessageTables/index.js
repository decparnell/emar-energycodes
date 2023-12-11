import removeNullValues from "../../dataspec/functions/removeNulls";
import styles from "../../../styles/tables.module.css";
import addPaddingToGroupId from "../../../components/dataspec/functions/addIdPadding";
import Link from "next/link";

const MarketMessageTables = (props) => {
  const keyTitle = props.keyTitle;
  const latestDataSpecVersion = props.latestDataSpecVersion;
  const dataBody = props.dataBody;
  const showApiColumns = props.showApiColumns ? props.showApiColumns : null;
  const legacy = props.legacy ? props.legacy : null;

  //Title Request Metering System tables
  const BasicInformation = (props) => {
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
                <td>{removeNullValues(props.legacy)}</td>
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
                  {addPaddingToGroupId(
                    props.marketMessageInfo.MessageVersionNumber
                  )}
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
                <td>Please View Scenario Variant</td>
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
                  {props.marketMessageInfo.Description
                    ? props.marketMessageInfo.Description
                    : "NA"}
                </td>
              </tr>
              <tr>
                <td className={styles.customTableHeader}>Notes</td>
                <td>
                  {props.marketMessageInfo.ExternalNotes
                    ? props.marketMessageInfo.ExternalNotes
                    : "NA"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  };

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
            <tr key={entry.DataItemIdentifier}>
              <td>
                <Link
                  href={{
                    pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[di]`,
                    query: {
                      di: entry.DataItemIdentifier,
                    },
                  }}
                  passHref={true}
                >
                  {" "}
                  {entry.DataItemIdentifier}
                </Link>
              </td>
              <td>
                <Link
                  href={{
                    pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[di]`,
                    query: {
                      di: entry.DataItemIdentifier,
                    },
                  }}
                  passHref={true}
                >
                  {/* if there is a null value , it replaces it with "" */}
                  {removeNullValues(entry.DTCLegacyReference) +
                    removeNullValues(entry.SPAALegacyReference) +
                    removeNullValues(entry.RGMALegacyReference) +
                    removeNullValues(entry.UNCDataItemReference) +
                    removeNullValues(entry.IUCDataItemReference) +
                    removeNullValues(entry.DCUSADataItemReference)}
                </Link>
              </td>
              <td>
                <Link
                  href={{
                    pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[di]`,
                    query: {
                      di: entry.DataItemIdentifier,
                    },
                  }}
                  passHref={true}
                >
                  {entry.DataItemName}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

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
            <tr key={entry.EnergyMarketMessageScenarioVariantIdentifier}>
              <td>
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
                  {" "}
                  {entry.EnergyMarketMessageScenarioVariantIdentifier}
                </Link>
              </td>
              <td>
                {" "}
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
                  {entry.EnergyMarketMessageScenarioVariantName}
                </Link>
              </td>
              <td>
                {" "}
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
                  {entry.SourceMarketDataServiceName}
                </Link>
              </td>
              <td>
                {" "}
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
                  {entry.TargetMarketDataServiceName}
                </Link>
              </td>
              {entry.ApiMethod ? (
                <td>
                  {" "}
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
                    {entry.ApiMethod}
                  </Link>
                </td>
              ) : null}
              {entry.ApiRoute ? (
                <td>
                  {" "}
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
                    {entry.ApiRoute}
                  </Link>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const MMTables = (props) => {
    switch (props.k) {
      case "Basic Information":
        return (
          <BasicInformation marketMessageInfo={dataBody} legacy={legacy} />
        );
      case "Data Items":
        return <DataItemsTable dataItems={dataBody} />;
      case "Scenario Variant":
        return (
          <ScenarioVariantTable
            svForMarketMessage={dataBody}
            showApiColumns={showApiColumns}
          />
        );
      default:
        return <div className={styles.headers}>Table not found</div>;
    }
  };

  return keyTitle === "Basic Information" ? (
    <div className={styles.infoTable}>
      <h1 className={styles.headers}>
        {dataBody.EnergyMarketMessageIdentifier} - {dataBody.Label}
      </h1>
      <MMTables k={keyTitle} />
    </div>
  ) : (
    <div className={styles.infoTable}>
      <h3 className={styles.headers}>{keyTitle}</h3>
      <MMTables k={keyTitle} />
    </div>
  );
};

export default MarketMessageTables;
