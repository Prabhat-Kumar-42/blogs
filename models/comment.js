const { default: mongoose, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blog_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      immutable: true,
    },
    // if this comment is a reply, comment_ref contains the reference of comment it's a reply to
    comment_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
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

const COMMENT = mongoose.model("comment", commentSchema);

module.exports = {
  COMMENT,
};
