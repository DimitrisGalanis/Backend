import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/comment.js";

const router = express.Router();

router.get("/:id", getComments);
router.post("/", addComment);
router.delete("/:id", deleteComment);
router.put("/", updateComment);

export default router;
