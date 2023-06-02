import styles from "../../styles/codes.module.css";

import { checkIfItemsAvailableInArray } from "../helperFunctions/checkIfItemsAvailableInArray";
import { checkIfVariablesAreAvailable } from "../helperFunctions/checkIfVariablesAreAvailable";
import { listItemsToIgnore, listHeaders } from "../../components/settings";
import { logError } from "../../components/helperFunctions/logError";
import LinkTextFromDefinitions from "../helperFunctions/linkTextFromDefinitions";
import CreateCustomTag from "./createCustomTag-scheduleId";
import InfiniteScroll from "react-infinite-scroll-component";
import { Component } from "react";

const CreateSchedulesContent = (props) => {

    const data = props.data;
    const definitions = props.definitions;


    const hasMoreData = props.hasMoreData;
    const fetchData = props.fetchData;

    const loadMoreData = props.loadMoreData;


    let content = [];
    //console.log("DATA", data)
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
                    CreateCustomTag(clause.clauseReference, clauseComponents, definitions)
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
                    {LinkTextFromDefinitions(
                        section.sectionName,
                        definitions
                    )}
                </h3>
                {componentsJsx}
            </div>
        );
    })
    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={hasMoreData}
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
            className={styles.scroll}
        >
            <div className={`${styles.scheduleContentContainer}`}>
                {content}
            <button onClick={loadMoreData}>Load More</button>
            </div>
        </InfiniteScroll>
    );
}

export default CreateSchedulesContent;