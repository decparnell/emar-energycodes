import styles from "../../styles/codes.module.css";
import Link from "next/link";
import Popup from "reactjs-popup";

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
  }

  //LOOP OVER EACH COMPONENT IN THE CLAUSE AND ADD IT TO THE SAME BOX (mainly ofr lists.)

  for (const compI in clauseComponents) {
    const comp = clauseComponents[compI];
    const text = comp.componentText;
    const indent = comp.indent;
    const tag = comp.componentType;
    const clauseComponentId = comp.componentId - 2;
    //create initial value for the tag and class name
    let customClassName = createIndentedText(indent);
    if (compI > 0) {
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
  const linkedText = splitTextByKeyWords(text, definitions);
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

function createIndentedText(indent) {
  let output = "plain_text";
  if (indent != 0) {
    output = `indented_${indent}`;
  }
  return output;
}

function splitTextByKeyWords(text, definitions) {
  //creating temp text value and the output array
  let searchText = text;
  let arrayOfText = [];
  //creating an array of the words that need linking
  let wordsToLink = definitions.map((a) => a.linkText);
  wordsToLink = wordsToLink.sort((a, b) => b.length - a.length);
  //for each word that needs linking
  for (const word in wordsToLink) {
    //create a variable containing the word
    let linkingWord = wordsToLink[word];
    //find the info about the linking word ie what the link for the word should be
    let linkInfo = definitions.find(
      (element) => element.linkText == linkingWord
    );
    //if the word can be found in the text
    if (searchText.indexOf(linkingWord) >= 0) {
      //split the text on the word to get an array of two halves
      let textSplit = searchText.split(linkingWord);
      //for each item in the array until var i is = to the length textsplit - 2
      for (var i = 0; i < textSplit.length - 1; i += 1) {
        //add two values to the array - first half of the split text and an 'a' link to the linked word
        arrayOfText.push(
          textSplit[i],
          <a
            className={styles.linkedText}
            href={`/codes-schedules/definitions/${encodeURIComponent(
              linkInfo["linkForwardUrl"]
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            {linkingWord}
          </a>
        );
      }
      //once we get to the end of the array set the temp text value to the rest of the sentence
      searchText = textSplit[i];
    }
  }
  //if no links are left in the string then add the rest of the string to the output array and return it
  arrayOfText.push(searchText);
  return arrayOfText;
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
