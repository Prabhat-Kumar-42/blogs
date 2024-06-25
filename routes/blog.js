const express = require("express");
const { handleBlogCreation } = require("../controllers/blog");
const { multerUpload } = require("../middlewares/multerConfig.js");
const {
  checkAuthentication,
} = require("../middlewares/checkAuthentication.js");
const router = express.Router();

router
  .route("/:blogID?")
  .get((req, res) => {
    return res.status(200).render("/");
  })
  .post(
    checkAuthentication,
    multerUpload.single("coverImage"),
    handleBlogCreation,
  );

module.exports = router;
