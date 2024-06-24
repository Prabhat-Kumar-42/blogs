const { createHmac } = require("crypto");

const hashAlgo = "sha256";

function getHash(salt, password) {
  const hashedPasword = createHmac(hashAlgo, salt).update(password).digest();
  return hashedPasword;
}

module.exports = {
  getHash,
};
