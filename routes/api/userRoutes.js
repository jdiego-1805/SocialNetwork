const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/Users
router.route("/").get(getUsers).post(createUser);

router
  .route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/Users/:userId/friend
router.route("/:userId/friend").post(addFriend);

// /api/Users/:userId/friend/:friendId
router.route("/:userId/friend/:friendId").delete(removeFriend);

module.exports = router;
