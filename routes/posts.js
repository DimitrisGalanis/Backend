import express from "express";
import {
  getPosts,
  getPosts5,
  getFrontPosts,
  getSportPosts,
  get3SportPosts,
  getPoliticsPosts,
  getOikonomiaPosts,
  getOikonomia2Posts,
  getKosmosPosts,
  get3KosmosPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/posts3", getPosts5);
router.get("/frontposts", getFrontPosts);
router.get("/sport", getSportPosts);
router.get("/sport3", get3SportPosts);
router.get("/politics", getPoliticsPosts);
router.get("/oikonomia", getOikonomiaPosts);
router.get("/oikonomia2", getOikonomia2Posts);
router.get("/kosmos", getKosmosPosts);
router.get("/kosmos2", get3KosmosPosts);
router.get("/:id", getPost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/", updatePost);

export default router;
