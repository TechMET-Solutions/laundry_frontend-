import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key-change-this";

// Encrypt password using AES
export const encryptPassword = (password) => {
  if (!password) return "";
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

// Decrypt password using AES
export const decryptPassword = (encryptedPassword) => {
  if (!encryptedPassword) return "";
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};

// Compare plaintext password with encrypted password
export const comparePassword = (plainPassword, encryptedPassword) => {
  try {
    const decrypted = decryptPassword(encryptedPassword);
    return plainPassword === decrypted;
  } catch (error) {
    console.error("Password comparison error:", error);
    return false;
  }
};
