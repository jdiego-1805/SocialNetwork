const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addReaction,
  removeReaction,
} = require("../../controllers/UserController");

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/Users/:UserId
router.route("/:UserId").get(getSingleUser).delete(deleteUser);

// /api/Users/:UserId/Reactions
router.route("/:UserId/Reactions").post(addReaction);

// /api/Users/:UserId/Reactions/:ReactionId
router.route("/:UserId/Reactions/:ReactionId").delete(removeReaction);

module.exports = router;
