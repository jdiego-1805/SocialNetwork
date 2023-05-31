const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reaction");

// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    ThoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: true,
      default: Date.now(),
      get: (date) => timeSince(date)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;