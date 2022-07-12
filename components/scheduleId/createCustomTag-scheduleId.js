import styles from "../../styles/codes.module.css";
import Link from "next/link";
import Popup from "reactjs-popup";

//temp value of the linked words which will switch to the API
const linkedWords = [
  { word: "SDES User", link: "sdes-user" },
  { word: "SDES", link: "sdes" },
  { word: "Parties", link: 31 },
  { word: "SDEP", link: "sdep" },
  { word: "CMRP", link: "cmrp" },
  { word: "Working Days", link: "working-days" },
];

function CreateCustomTag(
  text,
  style,
  secNumber,
  compNumber,
  componentId,
  indent,
  clauseReference
) {
  //mock up for component links
  let componentLinks = [];
  if (componentId < 170 && componentId > 160) {
    componentLinks = ["HELLO"];
  }
  let needed = false;
  if (componentLinks.length > 0) {
    needed = true;
  }
  //create decimal value of component order
  let orderNumber = " - ";
  if (clauseReference) {
    orderNumber = clauseReference;
  } else if (style == "title") {
    orderNumber = "";
  }
  //create initial value for the tag and class name
  let CustomTag = `${style}`;
  let customClassName = createIndentedText(indent);
  let componentComtainer = `${styles.compenentContainer}`;
  //alter class and tag depending on what the style is
  if (
    ["listNumber", "listNumberItem", "listBullet", "listBulletItem"].includes(
      style
    )
  ) {
    CustomTag = `p`;
  } else if (style === "title") {
    CustomTag = `h3`;
    componentComtainer = `${componentComtainer} ${styles.subHeading}`;
  } else if (style === "table") {
    CustomTag = `table`;
  }
  //create an array of the text to display including all links using split text function
  const linkedText = splitTextByKeyWords(text);
  //output is returned when this func is called.... JSX containing component, links, and numbering
  const output = (
    <div className={componentComtainer}>
      <div className={styles.orderNum}>{orderNumber}</div>
      <div className={styles.textHolder} key={componentId}>
        <CustomTag className={customClassName}>{linkedText}</CustomTag>
      </div>
      <div className={styles.linkButton}>
        <CreatePopUp needed={needed} />
      </div>
    </div>
  );
  return output;
}

function createIndentedText(indent) {
  let output = "plain_text";
  if (indent != 0) {
    output = `indented_${indent}`;
  }
  return output;
}

function splitTextByKeyWords(text) {
  //creating temp text value and the output array
  let searchText = text;
  let arrayOfText = [];
  //creating an array of the words that need linking
  const wordsToLink = linkedWords.map((a) => a.word);
  //for each word that needs linking
  for (const word in wordsToLink) {
    //create a variable containing the word
    let linkingWord = wordsToLink[word];
    //find the info about the linking word ie what the link for the word should be
    let linkInfo = linkedWords.find((element) => element.word == linkingWord);
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
              linkInfo["link"]
            )}`}
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
