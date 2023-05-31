const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  // Get all Users
  async getUsers(req, res) {
    try {
      const Users = await User.find();

      const UserObj = {
        Users,
        headCount: await headCount(),
      };

      res.json(UserObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single User
  async getSingleUser(req, res) {
    try {
      const User = await User.findOne({
        _id: req.params.UserId,
      }).select("-__v");

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
  // Delete a User and remove them from the User
  async deleteUser(req, res) {
    try {
      const User = await User.findOneAndRemove({
        _id: req.params.UserId,
      });

      if (!User) {
        return res.status(404).json({ message: "No such User exists" });
      }

      if (!User) {
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
  // update user
  async updateUser(req, res) {
    try {
      const User = await User.findOneAndUpdate(
        { _id: req.params.UserId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!User) {
        res.status(404).json({ message: "No User with this id!" });
      }

      res.json(User);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add an User
  async addFriend(req, res) {
    console.log("You are adding a Friend");
    console.log(req.body);

    try {
      const Friend = await Friend.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { Friend: req.body } },
        { runValidators: true, new: true }
      );

      if (!Friend) {
        return res
          .status(404)
          .json({ message: "No Friend found with that ID :(" });
      }

      res.json(Friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove Friend
  async removeFriend(req, res) {
    try {
      const Friend = await Friend.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { Friend: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!Friend) {
        return res
          .status(404)
          .json({ message: "No Friend found with that ID :(" });
      }

      res.json(Friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
