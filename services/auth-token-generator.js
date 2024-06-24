const jwt = require("jsonwebtoken");
const JWTSECRETKEY = process.env.JWTSECRETKEY;

function getToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    },
    JWTSECRETKEY,
  );
}

function verifyTokenAndGetUser(token) {
  try {
    const user = jwt.verify(token, JWTSECRETKEY);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  getToken,
  verifyTokenAndGetUser,
};
