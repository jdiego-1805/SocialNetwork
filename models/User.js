const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");

// Schema to create User model
const UserSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    github: {
      type: String,
      required: true,
      max_length: 50,
    },
    Reactions: [ReactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("User", UserSchema);

module.exports = User;
