import Link from "next/link";
import styles from "../../styles/dataspec.module.css";
import addPaddingToGroupId from "./functions/addIdPadding";
import removeNullValues from "./functions/removeNulls";
import AppContext from "../context/AppContext";
import { useContext, useEffect } from "react";

const CreateFlowStructure = (structure) => {
  const value = useContext(AppContext);
  let { latestDataSpecVersion } = value.state;
  useEffect(() => {
    // Client-side-only code
    value.setLatestDataSpecVersion(sessionStorage.getItem("version"));
  });
  const tableRows = [];
  const collectionsObj = getUniqueDIC(structure);

  for (const obj in collectionsObj) {
    const collection = collectionsObj[obj];
    const collectionToAdd = (
      <tr className={styles.collectionRow}>
        <td>{addPaddingToGroupId(collection.groupCode)}</td>
        <td>{collection.dic}</td>
        <td>{collection.range}</td>
        <td>{collection.condition}</td>
        {createLevelsInfo([], collection)}
        <td></td>
        <td></td>
      </tr>
    );
    const dataItems = structure.filter(
      (line) =>
        line.MessageScenarioVariantCollectionIdentifier == collection.dicId
    );
    //push the collection to the array
    tableRows.push(collectionToAdd);

    //create the data item info
    for (const i in dataItems) {
      const dataItem = dataItems[i];
      const DItoADD = (
        <Link
          href={{
            pathname: `/dataspec/${latestDataSpecVersion}/dataitem/[dataItemId]`,
            query: {
              dataItemId: dataItem.EnergyMarketDataItemIdentifier,
            },
          }}
        >
          <tr className={styles.pointer}>
            <td></td>
            <td></td>
            <td></td>
            <td>{dataItem.VariantDataItemRequirementTypeRule}</td>
            {createLevelsInfo(dataItem, collection)}
            <td>{dataItem.DataItemName}</td>
            <td>{dataItem.VariantDataItemValueRuleDescription}</td>
          </tr>
        </Link>
      );
      //push the data item into to the array
      tableRows.push(DItoADD);
    }
  }
  return (
    <table className={styles.flowStructure}>
      <thead>
        <th>Group ID</th>
        <th>Group Description</th>
        <th>Range</th>
        <th>Condition</th>
        <th>L1</th>
        <th>L2</th>
        <th>L3</th>
        <th>L4</th>
        <th>L5</th>
        <th>L6</th>
        <th>L7</th>
        <th>L8</th>
        <th>Data Item Name</th>
        <th>Data Item Rule</th>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default CreateFlowStructure;

function getUniqueDIC(structure) {
  const dataItemCollections = [];
  const dataCollectionObj = [];
  for (const line in structure) {
    const collectionId =
      structure[line].MessageScenarioVariantCollectionIdentifier;
    const collectionToAdd = structure[line].DataItemCollectionName;
    const parentToAdd = structure[line].ParentDataItemCollectionName;
    const range =
      `${structure[line].MessageScenarioVariantCollectionModality} - ${structure[line].MessageScenarioVariantCollectionCardinality}`.replace(
        "n",
        "*"
      );
    const groupCode =
      removeNullValues(structure[line].DTSGroupReference) +
      removeNullValues(structure[line].UNCRecordReference) +
      removeNullValues(structure[line].RGMAGroupID) +
      removeNullValues(structure[line].RGMAGroupReference) +
      removeNullValues(structure[line].CSSArrayNameReference);
    const level = findLevelOfDIC(dataCollectionObj, parentToAdd);
    const condition =
      structure[line].MessageScenarioVariantRequirementRuleDescription;
    const objToAdd = {
      dicId: collectionId,
      dic: collectionToAdd,
      groupCode: groupCode,
      parent: parentToAdd,
      range: range,
      level: level,
      condition: condition,
    };

    if (dataItemCollections.indexOf(collectionId) == -1) {
      dataItemCollections.push(collectionId);
      dataCollectionObj.push(objToAdd);
    }
  }

  return dataCollectionObj;
}

function findLevelOfDIC(dicObject, parent) {
  let level = 0;
  if (parent == null) {
    level = 1;
  } else {
    const result = dicObject.filter((col) => col.dic == parent);
    level = result[0].level + 1;
  }
  return level;
}

function createLevelsInfo(dataItem, collection) {
  let i = 1;
  const levelsData = [];
  let level = "";
  let optionality = "G";
  if (dataItem.length == 0) {
    level = collection.level;
  } else {
    level = collection.level + 1;
    optionality = findMandatory(dataItem);
  }

  while (i < 9) {
    if (i == level) {
      levelsData.push(<td>{optionality}</td>);
    } else {
      levelsData.push(<td></td>);
    }
    i++;
  }
  return levelsData;
}

function findMandatory(dataItem) {
  if (dataItem.DataItemRequirementTypeIdentifier == "DT10001") {
    return 1;
  } else if (dataItem.DataItemRequirementTypeIdentifier == "DT10002") {
    return "C";
  } else {
    return "O";
  }
}
