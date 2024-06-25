const express = require("express");
const { handleBlogReq, handleBlogCreation } = require("../controllers/blog");
const { multerUpload } = require("../middlewares/multerConfig.js");
const {
  checkAuthentication,
} = require("../middlewares/checkAuthentication.js");
const router = express.Router();

router.route("/blogForm").get(checkAuthentication, (req, res) => {
  return res.status(200).render("blogForm", {
    user: req.user,
  });
});

router
  .route("/:blogID?")
  .get(handleBlogReq)
  .post(
    checkAuthentication,
    multerUpload.single("coverImage"),
    handleBlogCreation,
  );

module.exports = router;
