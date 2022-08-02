const UserModal = require("../User/Modals/UserModal");
const bcrypt = require("bcryptjs");

const ExistingUser = async (email) => {
  let existingUser = false;
  await UserModal.find({ email: email }).then((Data) => {
    if (Data.length) {
      existingUser = true;
    }
  });
  return existingUser;
};

const generatepasswordhash = (password) => {
  const salt = 10;
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(salt).then((hashSalt) => {
      bcrypt.hash(password, hashSalt).then((passwordHash) => {
        resolve(passwordHash);
      });
    });
  });
};

module.exports = { ExistingUser, generatepasswordhash };
