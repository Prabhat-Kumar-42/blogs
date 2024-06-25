require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const staticRouter = require("./routes/staticRoutes.js");
const userRouter = require("./routes/user.js");
const blogRouter = require("./routes/blog.js");
const path = require("path");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/checkForAuthenticationCookie.js");

const app = express();
const PORT = 8000;

// DB setup
const DB_URL = "mongodb://127.0.0.1:27017/blog";
mongoose
  .connect(DB_URL)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("database connection failed", err));

app.set("view engine", "ejs");
app.set("views", "./views/");

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("authToken"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.use("/blogs", blogRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log("server started");
});
