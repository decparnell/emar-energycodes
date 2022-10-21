import styles from "../../styles/codes.module.css";
import Link from "next/link";
import Popup from "reactjs-popup";
import Image from "next/image";
import LinkTextFromDefinitions from "../helperFunctions/linkTextFromDefinitions";
function CreateCustomTag(clauseReference, clauseComponents, definitions) {
  const clauseJsx = [];
  const componentId = clauseComponents[0].componentId;
  const style = clauseComponents[0].componentType;
  //create decimal value of component order
  let orderNumber = " - ";
  if (clauseReference) {
    orderNumber = clauseReference;
  } else if (style == "title") {
    orderNumber = "";
  }

  //mock up for component links
  let componentLinks = [];
  if (componentId < 170 && componentId > 160) {
    componentLinks = ["HELLO"];
  }
  let needed = false;
  if (componentLinks.length > 0) {
    needed = true;
  }
  let CustomTag = `${style}`;
  let componentContainer = `${styles.componentContainer}`;
  //alter class and tag depending on what the style is
  if (
    ["listNumber", "listNumberItem", "listBullet", "listBulletItem"].includes(
      style
    )
  ) {
    CustomTag = `p`;
  } else if (style === "title") {
    CustomTag = `h3`;
    componentContainer = `${styles.subHeading}`;
  } else if (style === "table") {
    CustomTag = `table`;
  } else if (style.indexOf("image") != -1) {
    CustomTag = "Image";
  } else if (style.indexOf("text") != -1) {
    CustomTag = "p";
  }

  //LOOP OVER EACH COMPONENT IN THE CLAUSE AND ADD IT TO THE SAME BOX (mainly ofr lists.)

  for (const compI in clauseComponents) {
    const comp = clauseComponents[compI];
    const text = comp.componentText;
    const indent = comp.indent;
    const tag = comp.componentType;
    const clauseComponentId = comp.componentId;
    //create initial value for the tag and class name
    let customClassName = createIndentedText(indent);
    if (compI > 0 && (tag === "tableData" || tag === "tableHeader")) {
      customClassName = `${customClassName} ${styles.multipleClauses} ${styles.tableitem}`;
    } else if (compI > 0) {
      customClassName = `${customClassName} ${styles.multipleClauses}`;
    }

    //append jsx to the clauseJsx array depending on the type of data coming in
    if (tag == "tableHeader") {
      const tableJsx = [];
      const headersJsx = [];
      const tableData = clauseComponents.filter(
        (component) => component.componentType == "tableData"
      );
      CustomTag = `th`;
      const headers = text.split("|||");
      for (const header in headers) {
        addLinkedComponentsToOutput(
          headersJsx,
          headers[header],
          CustomTag,
          customClassName,
          definitions,
          clauseComponentId
        );
      }
      tableJsx.push(
        <thead>
          <tr>{headersJsx}</tr>
        </thead>
      );
      for (const item in tableData) {
        CustomTag = `td`;
        const dataJsx = [];
        const dataItems = tableData[item].componentText.split("|||");
        for (const entry in dataItems) {
          addLinkedComponentsToOutput(
            dataJsx,
            dataItems[entry],
            CustomTag,
            customClassName,
            definitions,
            clauseComponentId
          );
        }
        tableJsx.push(<tr>{dataJsx}</tr>);
      }

      clauseJsx.push(<table className={styles.clauseTable}>{tableJsx}</table>);
    } else if (tag == "tableData") {
    } else {
      //create an array of the text to display including all links using split text function
      addLinkedComponentsToOutput(
        clauseJsx,
        text,
        CustomTag,
        customClassName,
        definitions,
        clauseComponentId
      );
    }
  }

  //output is returned when this func is called.... JSX containing component, links, and numbering
  const output = (
    <div className={componentContainer} key={componentId} id={componentId}>
      <div className={styles.orderNum}>{orderNumber}</div>
      <div className={styles.textHolder}>{clauseJsx}</div>
      <div className={styles.linkButton}>
        <CreatePopUp needed={needed} />
      </div>
    </div>
  );
  return output;
}

function addLinkedComponentsToOutput(
  clauseJsx,
  text,
  CustomTag,
  customClassName,
  definitions,
  clauseComponentId
) {
  //create an array of the text to display including all links using split text function
  if (CustomTag === "Image") {
    clauseJsx.push(
      <Image
        alt="schedule image"
        src={text}
        className="scheduleImage"
        width="550%"
        height="600%"
      />
    );
  } else {
    const linkedText = LinkTextFromDefinitions(text, definitions);
    clauseJsx.push(
      <CustomTag
        className={customClassName}
        key={`${clauseComponentId}`}
        id={`${clauseComponentId}`}
      >
        {linkedText}
      </CustomTag>
    );
  }
}

function createIndentedText(indent) {
  let output = "plain_text";
  if (indent != 0) {
    output = `indented_${indent}`;
  }
  return output;
}

export default CreateCustomTag;

//function to create the popup to display the component links
function CreatePopUp(props) {
  const popupNeeded = props.needed;
  if (popupNeeded) {
    return (
      <Popup trigger={<button>Links Available</button>} position="left top">
        <div className={styles.linksPopup}>
          <h3 className={styles.popupTitle}>Links Available</h3>
          <Link href="https://emar.energycodes.co.uk/rm/web#action=com.ibm.rdm.web.pages.showArtifactPage&artifactURI=https%3A%2F%2Femar.energycodes.co.uk%2Frm%2Fresources%2FMD__4f7EHExEeu1MI-Jp8TKBw&componentURI=https%3A%2F%2Femar.energycodes.co.uk%2Frm%2Frm-projects%2F_Xqe2IFBPEeuGWeSXvTEFcQ%2Fcomponents%2F_XwleIFBPEeuGWeSXvTEFcQ&oslc.configuration=https%3A%2F%2Femar.energycodes.co.uk%2Fgc%2Fconfiguration%2F78">
            Schedule Diagram
          </Link>
        </div>
      </Popup>
    );
  }
  return null;
}
