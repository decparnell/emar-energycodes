import HoverOverFunctionDefinition from "../onHoverDefinition";
export default function LinkTextFromDefinitions(text, definitions) {
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
        //using the hover function to create the link to the definitions page, and the on hover function
        const hoverFunction = HoverOverFunctionDefinition(
          linkInfo["componentText"],
          linkingWord,
          linkInfo["linkForwardUrl"]
        );
        arrayOfText.push(textSplit[i], hoverFunction);
      }
      //once we get to the end of the array set the temp text value to the rest of the sentence
      searchText = textSplit[i];
    }
  }
  //if no links are left in the string then add the rest of the string to the output array and return it
  arrayOfText.push(searchText);
  return arrayOfText;
}
