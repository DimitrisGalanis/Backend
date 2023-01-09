import { db } from "../db.js";

export const getComments = (req, res) => {
  const q = "SELECT * FROM comments where post_id = ?";
  db.query(q, [req.params.id], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  console.log("add Comment");
};

export const deleteComment = (req, res) => {
  console.log("delete Comment");
};

export const updateComment = (req, res) => {
  console.log("update Comment");
};
