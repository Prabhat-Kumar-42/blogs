const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  const user = req.user;
  return res.status(200).render("home", {
    user: user,
  });
});

module.exports = router;
