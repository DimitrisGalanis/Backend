import { db } from "../db.js";

export const getComments = (req, res) => {
  const q = "SELECT * FROM comments where post_id = ?";
  db.query(q, [req.params.id], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const q =
    "INSERT INTO comments (`name`,`email`,`comment`,`post_id` ) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.comment,
    req.body.postid,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Comment has been created.");
  });
};

export const deleteComment = (req, res) => {
  console.log("delete Comment");
};

export const updateComment = (req, res) => {
  console.log("update Comment");
};
