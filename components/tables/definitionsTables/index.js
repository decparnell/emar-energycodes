import styles from "../../../styles/codes.module.css";
import { useState } from "react";
import { listItemsToIgnore } from "../../settings";
import CreateCustomTag from "../../scheduleId/createCustomTag-scheduleId";
import LinkTextFromDefinitions from "../../helperFunctions/linkTextFromDefinitions";

const DefinitionTables = (props) => {

  /* props: 
      definitions: set of definitions of a specific REC word
  */

  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const lettersArray = letters.split('');
  const rows = [];
  const columnsPerRow = 3; //Number of columns per Row
  for (let i = 0; i < lettersArray.length; i += columnsPerRow) {
    rows.push(lettersArray.slice(i, i + columnsPerRow));
  }

  const [selectedAlphabeticLetter, setselectedAlphabeticLetter] = useState("");
  const definitions = props.definitions;
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const defaultSectionId = {sectionId: 2237, sectionName: "Definitions"}

  const fetchDefinitionsByLetter = async (letter) => {
    //getDefinitionsByLetter
    let url = `https://prod-31.uksouth.logic.azure.com/workflows/87f5aaaab030422a86899a6ca24c1351/triggers/request/paths/invoke/documentId/2/version/4.1/sectionId/2237/letter/${letter}?api-version=2016-10-01&sp=%2Ftriggers%2Frequest%2Frun&sv=1.0&sig=eWSPnGwLkUOb6ZM2MLxynlkR1vR09rab9cfCJNeAefA`;
    setError(null);

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const dataResJson = await response.json();
      setData(dataResJson);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }

  const CreateAlphabeticTableContent = (props) => {
    let content = [];

    const formatData = [{ components: data, indent: 0, partId_FK: 1029, sectionId: 2237, sectionName: "Definitions", sectionOrder: 3 }];

    formatData.map((section) => {
      let componentsInSection = section.components.filter(function (el2) {
        return el2.sectionId_FK === section.sectionId;
      });

      const clauses = componentsInSection.filter(function (el2) {
        return listItemsToIgnore.indexOf(el2.componentType) == -1;
      });
      const componentsJsx = [];
      const clausesProcessed = [];

      for (const clauseI in clauses) {
        const clause = clauses[clauseI];
        if (clausesProcessed.indexOf(clause.clauseReference) == -1) {
          if (clause.clauseReference != "") {
            clausesProcessed.push(clause.clauseReference);
          }

          let clauseComponents = [];
          if (clause.componentType == "title") {
            clauseComponents.push(clause);
          } else {
            clauseComponents = componentsInSection.filter(function (el2) {
              return el2.clauseReference === clause.clauseReference;
            });
          }

          componentsJsx.push(
            CreateCustomTag(
              clause.clauseReference,
              clauseComponents,
              definitions
            )
          );
        }
      }

      content.push(
        <div
          id={`sec${section.sectionId}`}
          key={section.sectionName}
          className={styles.tableDefinitions}
        >
          <h3>
            ({section.sectionOrder})
            {LinkTextFromDefinitions(section.sectionName, definitions)}
          </h3>
          {componentsJsx}
        </div>
      );
    });

    return content;

  }

  const DefinitionsNotFound = () => {
    return (
      <div className={styles.infoLabelDefinitions}>
        <p>Definitions are not found for the letter: <b>{selectedAlphabeticLetter}</b></p>
      </div>
    );
  }

  const handleLetterClick = async (letter) => {
    setselectedAlphabeticLetter(letter);
    await fetchDefinitionsByLetter(letter);
    const section = document.getElementById(`sec${defaultSectionId.sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <p className={styles.infoLabelDefinitions}>Definitions are organized alphabetically. Please select a letter.</p>
      <table 
        className={styles.alphabetIndexTable}
        id={selectedAlphabeticLetter === "" || data.length <= 2 ? `sec${defaultSectionId.sectionId}` : 'AlphabeticTableSearchId'}
        key={selectedAlphabeticLetter === "" ? defaultSectionId.sectionName : 'AlphabeticTableSearchKey'}
      >
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((letter, columnIndex) => (
                <td key={columnIndex} onClick={() => handleLetterClick(letter)}
                  className={`${styles.cellHovered} ${selectedAlphabeticLetter === letter ? styles.cellSelected : ''}`}
                >
                  {"[" + letter + "]"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {
        //data.length > 2 because includes caption and header
        isLoading ?
          <p className={`${styles.loadingCustomStyle} loading-container`}>Loading</p>
          : (selectedAlphabeticLetter !== "" && data.length > 2
            ? <CreateAlphabeticTableContent /> : (selectedAlphabeticLetter !== "" ? <DefinitionsNotFound /> : null))
      }
    </>
  )

};

export default DefinitionTables;