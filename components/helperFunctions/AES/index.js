const moduleSettings = require("../../moduleSettings");
var CryptoJS = require("crypto-js/");

const key = CryptoJS.enc.Hex.parse(moduleSettings.usePhrase);
const iv = CryptoJS.enc.Hex.parse(moduleSettings.iv);
const options = {
  iv: iv,
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
};

const encryptWithAES = (text) => {
  const encryptedData = CryptoJS.AES.encrypt(text, key, options);
  return encryptedData.toString();
};

const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key, options);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

module.exports = { encryptWithAES, decryptWithAES };
