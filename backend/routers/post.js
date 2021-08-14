const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const multer = require("multer");
const storage = require("../middlewares/mimeType");
const auth = require("../middlewares/auth");

router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getPostById);
router.post(
  "/posts",
  auth,
  multer({ storage: storage }).single("image"),
  postController.addPost
);
router.delete("/posts/:id", auth, postController.deletePostById);
router.patch(
  "/posts/:id",
  auth,
  multer({ storage: storage }).single("image"),
  postController.updatePostById
);
module.exports = router;
