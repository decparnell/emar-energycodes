import styles from "../../styles/codes.module.css";

import { checkIfItemsAvailableInArray } from "../helperFunctions/checkIfItemsAvailableInArray";
import { checkIfVariablesAreAvailable } from "../helperFunctions/checkIfVariablesAreAvailable";
import { listItemsToIgnore, listHeaders } from "../../components/settings";
import { logError } from "../../components/helperFunctions/logError";
import LinkTextFromDefinitions from "../helperFunctions/linkTextFromDefinitions";
import CreateCustomTag from "./createCustomTag-scheduleId";

const CreateSchedulesContent = (props) => {

    const parts = props.parts;
    const sections = props.sections;
    const components = props.components;
    const definitions = props.definitions;

    const apiVarList = [
        { obj: parts, name: "parts" },
        { obj: sections, name: "sections" },
        { obj: components, name: "components" },
        { obj: definitions, name: "definitions" },
    ];
    const internalErrorLog = checkIfVariablesAreAvailable(apiVarList);

    let content = [];
    if (checkIfItemsAvailableInArray(internalErrorLog, "parts")) {
        for (const part of parts) {
            part.partName !== "Main" ?
            content.push(
                <h2 id={`${part.partId}`} className={styles.partName}>
                    {part.partName}
                </h2>
            ) : null
            if (checkIfItemsAvailableInArray(internalErrorLog, "sections")) {
                let sectionsInPart = sections.filter((sec) => {
                    return sec.partId_FK === part.partId;
                });

                if (checkIfItemsAvailableInArray(internalErrorLog, "components")) {
                    for (const section of sectionsInPart) {
                        let componentsInSection = components.filter(function (el2) {
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
                        const linkedSectionName = LinkTextFromDefinitions(
                            section.sectionName,
                            definitions
                        );
                        content.push(
                            <div
                                id={`sec${section.sectionId}`}
                                key={section.sectionName}
                                className={styles.section}
                            >
                                <h3>
                                    ({section.sectionOrder}) {linkedSectionName}
                                </h3>
                                {componentsJsx}
                            </div>
                        );
                    }
                } else {
                    return (
                        <div className={styles.errorBox}>{logError("Components")}</div>
                    );
                }
            } else {
                return <div className={styles.errorBox}>{logError("Sections")}</div>;
            }
        }
    }
    if (checkIfItemsAvailableInArray(internalErrorLog, "parts")) {
        return <div className={`${styles.scheduleContentContainer}`}>{content}</div>;
    } else {
        return (
            <div className={styles.errorBox}>
                {logError("Parts", "is not available")}
            </div>
        );
    }
}

export default CreateSchedulesContent;