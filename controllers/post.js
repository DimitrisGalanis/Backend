import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = "SELECT * FROM posts";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  res.json("from controller");
};

export const addPost = (req, res) => {
  res.json("from controller");
};

export const deletePost = (req, res) => {
  res.json("from controller");
};

export const updatePost = (req, res) => {
  res.json("from controller");
};
