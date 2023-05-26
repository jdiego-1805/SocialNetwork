const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addreaction,
  removereaction,
} = require("../../controllers/userController");

// /api/Users
router.route("/").get(getUsers).post(createUser);

// /api/Users/:UserId
router.route("/:UserId").get(getSingleUser).delete(deleteUser);

// /api/Users/:UserId/reactions
router.route("/:UserId/reactions").post(addreaction);

// /api/Users/:UserId/reactions/:reactionId
router.route("/:UserId/reactions/:reactionId").delete(removereaction);

module.exports = router;
