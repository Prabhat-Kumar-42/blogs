const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  return res.status(200).render("home", {
    user: req.user,
  });
});

router.route("/signup").get((req, res) => {
  return res.status(200).render("signup");
});

router.route("/login").get((req, res) => {
  return res.status(200).render("login");
});

router.route("/createblog").get((req, res) => {
  return res.status(200).render("blog-form");
});

module.exports = router;
