const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      }).select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        user,
        grade: await grade(req.params.userId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      console.log(user)
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      if (!user) {
        return res.status(404).json({
          message: "user deleted, but no Thoughts found",
        });
      }

      res.json({ message: "user successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add an user
  async addFriend(req, res) {
    console.log("You are adding a Friend");
    console.log(req.body);

    try {
      const friend = await Friend.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { Friend: req.body } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No Friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove Friend
  async removeFriend(req, res) {
    try {
      const friend = await Friend.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { Friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No Friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
