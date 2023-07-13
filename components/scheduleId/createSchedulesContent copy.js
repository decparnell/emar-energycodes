import styles from "../../styles/codes.module.css";
import { listItemsToIgnore } from "../../components/settings";
import LinkTextFromDefinitions from "../helperFunctions/linkTextFromDefinitions";
import CreateCustomTag from "./createCustomTag-scheduleId";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
const CreateSchedulesContent = (props) => {
  /* props: 
        data: contains all the data (sections + components)
        definitions: set of definitions of a specific REC word
        fetchData: parent method for fetch new data
        totalLength: sum of all the components

    */
  const data = props.data;
  const definitions = props.definitions;

  const hasMore = props.hasMoreData;
  const fetchData = props.fetchData;

  const totalLength = props.totalLength;

  const CreateContent = () => {
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
              definitions
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

  const [items, setItems] = useState(Array.from({ length: 50 }));

  //console.log(data2.length);
  const style = {
    height: 30,
    width: "20%",
    border: "1px solid green",
    margin: "auto",
    padding: 8,
  };
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    console.log("fetch");
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  };
  return (
    <InfiniteScroll
      dataLength={items.length - 3}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {items.map((i, index) => (
        <div style={style} key={index}>
          div - #{index}
        </div>
      ))}
    </InfiniteScroll>
  );
  {
    /* <InfiniteScroll
      dataLength={data2.length}
      next={next2}
      hasMore={hasMore}
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
    >
      <table style={{ width: "20%", margin: 0 }}>
        {data2.map((item, index) => {
          return <tr key={index}>{item}</tr>;
        })}
      </table>

      {/* <CreateContent /> 
    </InfiniteScroll> */
  }
};

export default CreateSchedulesContent;
