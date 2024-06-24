const express = require("express");
const router = express.Router();
const {
  handleUserLogin,
  handleUserSignUp,
  handleUserLogout,
} = require("../controllers/user.js");

router
  .route("/signup")
  .get((req, res) => res.status(302).redirect("/signup"))
  .post(handleUserSignUp);
router
  .route("/login")
  .get((req, res) => res.status(302).redirect("/login"))
  .post(handleUserLogin);
router.route("/logout").get(handleUserLogout);

module.exports = router;
