const CryptoJS = require("crypto-js");
const usePhrase = require("../../settings");

const encryptWithAES = (text) => {
  return CryptoJS.AES.encrypt(text, usePhrase).toString();
};
const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, usePhrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = { encryptWithAES, decryptWithAES };
