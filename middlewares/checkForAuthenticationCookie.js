const { verifyTokenAndGetUser } = require("../services/auth-token-generator");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return next();
    }
    try {
      const userPayload = verifyTokenAndGetUser(token);
      req.user = userPayload;
    } catch (error) {
      console.log(error);
    }
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
