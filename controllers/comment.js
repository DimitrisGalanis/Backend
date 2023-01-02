import { db } from "../db.js";

export const getComments = (req, res) => {
  console.log("get Comments");
  res.json("get comments");
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
