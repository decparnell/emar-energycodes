var AES = require("crypto-js/aes");
const moduleSettings = require("../../moduleSettings");

const encryptWithAES = (text) => {
  return AES.encrypt(text, moduleSettings.usePhrase).toString();
};
const decryptWithAES = (ciphertext) => {
  const bytes = AES.decrypt(ciphertext, usePhrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = { encryptWithAES, decryptWithAES };
