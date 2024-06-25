const express = require("express");
const { BLOG } = require("../models/blogs.js");

async function handleBlogReq(req, res) {
  const blogID = req.params.blogID;
  if (!blogID) {
    const blogs = await BLOG.find({});
    return res.status(200).render("blog", blogs);
  }
  const blog = await BLOG.findById({ _id: blogID });
  if (!blog) {
    return res.render("blog", {
      error: "blog not found",
    });
  }
  return res.render("blog", {
    blog: blog,
  });
}

async function handleBlogCreation(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(400).render("login", {
      error: "login required",
    });
  }
  const { title, description, content } = req.body;
  const cover_image_path = req.file ? req.file.path : null;
  const owner_id = user._id;
  const blog = await BLOG.create({
    title: title,
    description: description,
    content: content,
    cover_image: cover_image_path,
    owner: owner_id,
  });
  return res.redirect("/blogs");
}

module.exports = {
  handleBlogReq,
  handleBlogCreation,
};
