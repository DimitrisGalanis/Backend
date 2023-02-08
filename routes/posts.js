import express from "express";
import {
  getPosts,
  getSportPosts,
  getPoliticsPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/sport", getSportPosts);
router.get("/politics", getPoliticsPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/", updatePost);

export default router;
