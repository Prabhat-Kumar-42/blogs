const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  return res.status(200).render("home");
});

router.route("/signup").get((req, res) => {
  return res.status(200).render("signup");
});

router.route("/login").get((req, res) => {
  return res.status(200).render("login");
});

module.exports = router;
