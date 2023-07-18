const CryptoJS = require("crypto-js");
import { usePhrase } from "../../components/settings";

export const encryptWithAES = (text) => {
  return CryptoJS.AES.encrypt(text, usePhrase).toString();
};

export const decryptWithAES = (ciphertext) => {
  const passphrase = "123";
  const bytes = CryptoJS.AES.decrypt(ciphertext, usePhrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
