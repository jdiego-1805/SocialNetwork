// ObjectId() method for converting UserId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// TODO: Create an aggregate function to get the number of Users overall
const headCount = async () => {
  // Your code here
  const numberOfUsers = await User.aggregate();
  return numberOfUsers;
};

// Execute the aggregate method on the User model and calculate the overall grade by using the $avg operator
const grade = async (UserId) =>
  User.aggregate([
    // TODO: Ensure we include only the User who can match the given ObjectId using the $match operator
    {
      // Your code here
    },
    {
      $unwind: "$reactions",
    },
    // TODO: Group information for the User with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
      // Your code here
    },
  ]);

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const Users = await User.find();
      const UserObj = {
        Users,
        headCount: await headCount(),
      };
      return res.json(UserObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single User
  async getSingleUser(req, res) {
    try {
      const User = await User.findOne({ _id: req.params.UserId })
        .select("-__v")
        .lean();

      if (!User) {
        return res.status(404).json({ message: "No User with that ID" });
      }

      res.json({
        User,
        grade: await grade(req.params.UserId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new User
  async createUser(req, res) {
    try {
      const User = await User.create(req.body);
      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a User and remove them from the Thought
  async deleteUser(req, res) {
    try {
      const User = await User.findOneAndRemove({ _id: req.params.UserId });

      if (!User) {
        return res.status(404).json({ message: "No such User exists" });
      }

      const Thought = await Thought.findOneAndUpdate(
        { Users: req.params.UserId },
        { $pull: { Users: req.params.UserId } },
        { new: true }
      );

      if (!Thought) {
        return res.status(404).json({
          message: "User deleted, but no Thoughts found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an reaction to a User
  async addreaction(req, res) {
    try {
      console.log("You are adding an reaction");
      console.log(req.body);
      const User = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!User) {
        return res
          .status(404)
          .json({ message: "No User found with that ID :(" });
      }

      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a User
  async removereaction(req, res) {
    try {
      const User = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!User) {
        return res
          .status(404)
          .json({ message: "No User found with that ID :(" });
      }

      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
