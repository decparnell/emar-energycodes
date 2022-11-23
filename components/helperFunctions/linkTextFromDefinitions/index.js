import HoverOverFunctionDefinition from "../onHoverDefinition";
export default function LinkTextFromDefinitions(text, definitions) {
  //creating temp text value and the output array
  let searchText = [text];

  let arrayOfText = [];
  //creating an array of the words that need linking
  let wordsToLink = definitions.map((a) => a.linkText);
  wordsToLink = wordsToLink.sort((a, b) => b.length - a.length);

  //for each word that needs linking
  for (const word in wordsToLink) {
    //for each row in the search text array
    let searchCounter = 0;
    do {
      if (typeof searchText[searchCounter] != "object") {
        //create a variable containing the word
        let linkingWord = wordsToLink[word];
        //find the info about the linking word ie what the link for the word should be
        let linkInfo = definitions.find(
          (element) => element.linkText == linkingWord
        );
        //if the word can be found in the text
        if (searchText[searchCounter].indexOf(linkingWord) >= 0) {
          //split the text on the word to get an array of two halves
          let textSplit = searchText[searchCounter].split(linkingWord);
          //split counter count against the number of textSplit.length
          //extra counter takes into account the additional entries with each iteration
          let extraCounter = 0;
          let splitCounter = 0;
          do {
            const hoverFunction = HoverOverFunctionDefinition(
              linkInfo["componentText"],
              linkInfo["linkType"],
              linkingWord,
              linkInfo["linkForwardUrl"],
              linkInfo["versionName"]
            );
            if (splitCounter == 0) {
              //if there is only one definition found in the string then replace the string with the first half of the split text
              searchText.splice(
                parseInt(searchCounter) + extraCounter,
                1,
                textSplit[splitCounter]
              );
            } else {
              //if there is more than one definition is found in the string then and this is the second, then add the string to the end.
              searchText.splice(
                parseInt(searchCounter) + extraCounter,
                0,
                textSplit[splitCounter]
              );
            }
            searchText.splice(
              parseInt(searchCounter) + extraCounter + 1,
              0,
              hoverFunction
            );
            extraCounter += 2;
            splitCounter++;
          } while (splitCounter < textSplit.length - 1);
          searchText.splice(
            parseInt(searchCounter) + extraCounter,
            0,
            textSplit[textSplit.length - 1]
          );
        }
      }
      searchCounter++;
    } while (searchCounter < searchText.length);
  }
  arrayOfText.push(searchText);
  return arrayOfText;
}
//for testing to print sentences
/* function printArray(array) {
  console.log("--------------");
  for (const i in array) {
    if (typeof array[i] == "object") {
      console.log("[", array[i].key, "]");
    } else {
      console.log(array[i]);
    }
  }
  console.log("--------------");
} */
