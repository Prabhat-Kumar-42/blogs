const express = require("express");
const { USER } = require("../models/user.js");
const {
  getToken,
  verifyTokenAndGetUser,
} = require("../services/auth-token-generator.js");

async function handleUserSignUp(req, res) {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !email || !password) {
    res.status(400).render("signup", {
      err: "first_name, last_name, email and password are required fields",
    });
  }
  try {
    const user = await USER.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    });
    res.status(201).render("login");
  } catch (error) {
    console.log(error);
    req.status(500).render("server_error");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render("login", {
      err: "email and password are required fields",
    });
  }
  try {
    const user = await USER.matchPassword(email, password);
    if (!user) {
      return res.status(400).render("login", {
        error: "email or password incorrect",
      });
    }
    const authToken = getToken(user);
    res.cookie("authToken", authToken);
    return res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).render("server_error");
  }
}

function handleUserLogout(req, res) {
  res.clearCookie("authToken").redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handleUserLogout,
};
