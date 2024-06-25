const checkAuthentication = (req, res, next) => {
  if (!req.user) {
    return res.status(400).render("login", {
      error: "Login required to create a blog post",
    });
  }
  next();
};

module.exports = {
  checkAuthentication,
};
