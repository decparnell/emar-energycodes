/**
 * escape text to be included as part of path in api calls
 */
const sanitizeForUrl = (text) => {
  // this regex is for replacing special characters (?!/\*;|) in text
  const regex = new RegExp(/[\?\!\/\\\*\;\|]/g);
  // escape characters from the regex above with \ and ' with ''
  const result = text.replace(regex, "\\$&").replaceAll("'", "''");
  // $& Inserts the matched substring. (https://devdocs.io/javascript/global_objects/string/replace)
  return result;
};

export default sanitizeForUrl;
