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

  console.log(releaseManagementTable);

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
    return (
      <tr>
        <td rowSpan={props.sumChangeAffected}>{props.version}</td>
        <td rowSpan={props.sumChangeAffected}>{props.status}</td>
        <td rowSpan={props.sumChangeAffected}>{props.releaseDate}</td>
        <td rowSpan={props.changeAffectedLength}>{props.changeNumber}</td>
        <td rowSpan={props.changeAffectedLength}>{props.changeName}</td>
        <td>{props.affectedRecItems}</td>
        <td rowSpan={props.sumChangeAffected}>{props.emarVersion}</td>
        <td rowSpan={props.sumChangeAffected}>
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
        <td rowSpan={props.changeAffectedLength}>{props.changeNumber}</td>
        <td rowSpan={props.changeAffectedLength}>{props.changeName}</td>
        <td>{props.affectedRecItems}</td>
      </tr>
    );
  };

  const CreateAffectedRow = (props) => {
    return (
      <tr>
        <td>{props.affectedRecItems}</td>
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
          affectedRecItems={
            item.changeProposal[0].changeAffected[0].affectedRecItems
          }
          emarVersion={item.emarVersion}
          linkToDetailedNotes={item.linkToDetailedNotes}
          sumChangeAffected={item.sumChangeAffected}
          changeAffectedLength={item.changeProposal[0].changeAffectedLength}
        />
      );

      if (item.changeProposal[0].changeAffectedLength > 1) {
        for (let i = 1; i < item.changeProposal[0].changeAffectedLength; i++) {
          tableData.push(
            <CreateAffectedRow
              affectedRecItems={
                item.changeProposal[0].changeAffected[i].affectedRecItems
              }
            />
          );
        }
      }

      if (item.changeProposalLength > 1) {
        for (let i = 1; i < item.changeProposalLength; i++) {
          tableData.push(
            <CreateChangeRow
              changeNumber={item.changeProposal[i].number}
              changeName={item.changeProposal[i].name}
              affectedRecItems={
                item.changeProposal[i].changeAffected[0].affectedRecItems
              }
              changeAffectedLength={item.changeProposal[i].changeAffectedLength}
            />
          );

          if (item.changeProposal[i].changeAffectedLength > 1) {
            for (
              let j = 1;
              j < item.changeProposal[i].changeAffectedLength;
              j++
            ) {
              tableData.push(
                <CreateAffectedRow
                  affectedRecItems={
                    item.changeProposal[i].changeAffected[j].affectedRecItems
                  }
                />
              );
            }
          }
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
