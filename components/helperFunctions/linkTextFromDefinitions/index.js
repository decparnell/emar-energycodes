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
    for (const i in searchText) {
      if (typeof searchText[i] == "string") {
        //create a variable containing the word
        let linkingWord = wordsToLink[word];
        //find the info about the linking word ie what the link for the word should be
        let linkInfo = definitions.find(
          (element) => element.linkText == linkingWord
        );
        //if the word can be found in the text
        if (searchText[i].indexOf(linkingWord) >= 0) {
          //split the text on the word to get an array of two halves
          let textSplit = searchText[i].split(linkingWord);
          //for each item in the array until var i is = to the length textsplit - 2
          for (var j = 0; j < textSplit.length - 1; j += 1) {
            //using the hover function to create the link to the definitions page, and the on hover function
            const hoverFunction = HoverOverFunctionDefinition(
              linkInfo["componentText"],
              linkInfo["linkType"],
              linkingWord,
              linkInfo["linkForwardUrl"]
            );
            //if no definitions have been pushed yet
            if (j == 0 && searchText.length == 1) {
              searchText[i] = textSplit[j];
              searchText.splice(i + 1, 0, hoverFunction);
              searchText.splice(i + 2, 0, textSplit[j + 1]);
              //if no definitions have been pushed, and this is the second item
            } else if (j > 0) {
              searchText.splice(i + j + 1, 0, hoverFunction);
              searchText.splice(i + j + 2, 0, textSplit[j + 1]);
            } else {
              searchText[parseInt(i)] = textSplit[j];
              searchText.splice(parseInt(i) + 1, 0, hoverFunction);
              searchText.splice(parseInt(i) + 2, 0, textSplit[j + 1]);
            }
          }
        }
      }
    }
  }
  arrayOfText.push(searchText);
  return arrayOfText;
}
