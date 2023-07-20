/* var AES = require("crypto-js/aes");
var ENC = require("crypto-js/enc-utf8");
const moduleSettings = require("../../moduleSettings"); */
import Utf8 from "crypto-js/enc-utf8";
import { AES } from "crypto-js";
import { usePhrase } from "../../moduleSettings";
export const encryptWithAES = (text) => {
  return AES.encrypt(text, usePhrase).toString();
};
export const decryptWithAES = (ciphertext) => {
  const bytes = AES.decrypt(ciphertext, moduleSettings.usePhrase);
  const originalText = bytes.toString(Utf8);
  return originalText;
};

//module.exports = { encryptWithAES, decryptWithAES };
