const { default: mongoose, Schema } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String,
      immutable: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      immutable: true,
    },
  },
  { timestamp: true },
);

const BLOG = mongoose.model("blog", blogSchema);

module.exports = {
  BLOG,
};
