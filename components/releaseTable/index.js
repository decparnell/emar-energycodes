import styles from "../../styles/releaseManagement.module.css";
const ReleaseTable = (props) => {
  const recVersion = props.versions;
  const changeProposal = props.changes;
  const changeAffectedSchedules = props.affected;

  //merge for changeProposal and changeAffectedSchedules
  const mergedChanges = changeProposal.map((changeProposal) => {
    const changeAffected = filterByFieldId(
      changeAffectedSchedules,
      "changeProposalId_FK",
      changeProposal.changeProposalId
    );
    return {
      ...changeProposal,
      changeAffectedLength: changeAffected.length,
      changeAffected,
    };
  });

  //merge recVersion with mergedChanges(changeProposal and changeAffectedSchedules)
  const releaseManagementTable = recVersion.map((recVer) => {
    const changeProposal = filterByFieldId(
      mergedChanges,
      "recVersionId_FK",
      recVer.recVersionsId
    );
    const sumChangeAffected = changeProposal.map((cp) => {
      let sumChangeAffected = 0;
      sumChangeAffected = sumChangeAffected + cp.changeAffectedLength;
      return sumChangeAffected;
    });

    return {
      ...recVer,
      changeProposalLength: changeProposal.length,
      changeProposal,
      sumChangeAffected: sumChangeAffected.reduce(
        (sum, value) => (sum = sum + value),
        0
      ),
    };
  });

  function sortByReleaseDate(a, b) {
    return (
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  }
  //Filter JSON object by specific field and id
  function filterByFieldId(jsonData, field_name, id) {
    return jsonData.filter((obj) => obj[field_name] === id);
  }

  const CreateVersionRow = (props) => {
    console.log(props.affectedRecItems);
    return (
      <tr>
        <td rowSpan={props.changeProposalLength}>{props.version}</td>
        <td rowSpan={props.changeProposalLength}>{props.status}</td>
        <td rowSpan={props.changeProposalLength}>{props.releaseDate}</td>
        <td>{props.changeNumber}</td>
        <td>{props.changeName}</td>
        <td>
          <ul className={styles.affectedItemList}>
            {props.affectedRecItemsList.map((item) => {
              return (
                <li className={styles.affectedItem}>{item.affectedRecItems}</li>
              );
            })}
          </ul>
        </td>
        <td rowSpan={props.changeProposalLength}>{props.emarVersion}</td>
        <td rowSpan={props.changeProposalLength}>
          <a href={props.linkToDetailedNotes} target="_blank" rel="noreferrer">
            {props.version} Release Notes
          </a>
        </td>
      </tr>
    );
  };

  const CreateChangeRow = (props) => {
    return (
      <tr>
        <td>{props.changeNumber}</td>
        <td>{props.changeName}</td>
        <td>
          <ul className={styles.affectedItemList}>
            {props.affectedRecItemsList.map((item) => {
              return (
                <li className={styles.affectedItem}>{item.affectedRecItems}</li>
              );
            })}
          </ul>
        </td>
      </tr>
    );
  };

  const CreateTableData = (props) => {
    //props - versions;changes;affected
    const versions = props.versions;
    const tableData = [];
    function callRow(item) {
      tableData.push(
        <CreateVersionRow
          version={item.name}
          status={item.status}
          releaseDate={new Date(item.releaseDate).toLocaleDateString("en-GB")}
          changeNumber={item.changeProposal[0].number}
          changeName={item.changeProposal[0].name}
          affectedRecItemsList={item.changeProposal[0].changeAffected}
          emarVersion={item.emarVersion}
          linkToDetailedNotes={item.linkToDetailedNotes}
          changeProposalLength={item.changeProposalLength}
        />
      );

      if (item.changeProposalLength > 1) {
        for (let i = 1; i < item.changeProposalLength; i++) {
          tableData.push(
            <CreateChangeRow
              changeNumber={item.changeProposal[i].number}
              changeName={item.changeProposal[i].name}
              affectedRecItemsList={item.changeProposal[i].changeAffected}
              changeAffectedLength={item.changeProposal[i].changeAffectedLength}
            />
          );
        }
      }
    }
    versions.forEach(callRow);

    return tableData;
  };

  return (
    <table className={styles.tableRM}>
      <thead>
        <tr>
          <th>Version</th>
          <th>Status</th>
          <th>Release Date</th>
          <th>Change Proposal Number</th>
          <th>Change Proposal Name</th>
          <th>Affected REC Items</th>
          <th>EMAR Version</th>
          <th>Release</th>
        </tr>
      </thead>
      <tbody>
        <CreateTableData
          versions={releaseManagementTable.sort(sortByReleaseDate)}
        />
      </tbody>
    </table>
  );
};

export default ReleaseTable;
