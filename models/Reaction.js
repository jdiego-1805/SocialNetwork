const { Schema, Types } = require("mongoose");
const moment = require('moment')

const ReactionSchema = new Schema(
  {
    ReactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    ReactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

module.exports = ReactionSchema;
