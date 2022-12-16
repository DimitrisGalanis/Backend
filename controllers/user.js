import { db } from "../db.js";

export const getUsers = (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getUser = (req, res) => {
  res.json("from controller");
};

export const addUser = (req, res) => {
  res.json("from controller");
};

export const deleteUser = (req, res) => {
  res.json("from controller");
};

export const updateUser = (req, res) => {
  res.json("from controller");
};
