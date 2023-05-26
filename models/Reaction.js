const { Schema, Types } = require("mongoose");

const ReactionSchema = new Schema(
  {
    ReactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    ReactionName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 4,
      default: "Unnamed Reaction",
    },
    score: {
      type: Number,
      required: true,
      default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = ReactionSchema;
