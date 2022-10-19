const sanitizeForUrl = (searchPhrase) => {
  const regex = new RegExp(/[\?\!\/\\\*\;\|]/g);
  const result = searchPhrase.replace(regex, "\\$&").replaceAll("'", "''");
  // $& Inserts the matched substring. (https://devdocs.io/javascript/global_objects/string/replace)
  return result;
};

export default sanitizeForUrl;
