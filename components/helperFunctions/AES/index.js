var AES = require("crypto-js/aes");
var ENC = require("crypto-js/enc-utf8");
const moduleSettings = require("../../moduleSettings");

const encryptWithAES = (text) => {
  return AES.encrypt(text, moduleSettings.usePhrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const bytes = AES.decrypt(ciphertext, moduleSettings.usePhrase);
  const originalText = bytes.toString(ENC);
  return originalText;
};

module.exports = { encryptWithAES, decryptWithAES };
