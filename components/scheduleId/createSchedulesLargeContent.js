import styles from "../../styles/codes.module.css";
import { listItemsToIgnore } from "../../components/settings";
import LinkTextFromDefinitions from "../helperFunctions/linkTextFromDefinitions";
import CreateCustomTag from "./createCustomTag-scheduleId";
import InfiniteScroll from "react-infinite-scroll-component";
import { scheduleInterpretationDefinitions } from "../../components/settings";

const CreateSchedulesLargeContent = (props) => {
  /* props: 
        scheduleId: ID of the document/schedule
        data: contains all the data (sections + components)
        definitions: set of definitions of a specific REC word
        fetchData: parent method for fetch new data
        totalLength: sum of all the components

    */
  const scheduleId = props.scheduleId;
  const data = props.data;
  const definitions = props.definitions;

  const hasMore = props.hasMoreData;
  const fetchData = props.fetchData;
  const hightlight = props.highlightComponentId;
  const totalLength = props.totalLength;
  const CreateContent = (props) => {
    let content = [];

    data.map((section) => {
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
              definitions,
              hightlight
            )
          );
        }
      }

      content.push(
        <div
          id={`sec${section.sectionId}`}
          key={section.sectionName}
          className={styles.section}
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
  };

  return (
    <div className={styles.scroll}>
      <CreateContent />
    </div>
  );
};

export default CreateSchedulesLargeContent;



