import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = "SELECT * FROM posts";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q = "SELECT * FROM POSTS WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  console.log(req.body);
  const q =
    "INSERT INTO blog.POSTS (`title`,`description`,`img`,`category`,`tag`,`date`,`uid`,`username` ) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.img,
    req.body.category,
    req.body.tag,
    req.body.date,
    req.body.uid,
    req.body.username,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
  });
};

export const deletePost = (req, res) => {
  const postID = req.params.id;
  const q = "DELETE FROM posts WHERE `id` = ?";
  db.query(q, [postID], (err, data) => {
    if (err) return res.status(403).json(err);
    return res.json("Post has been deleted.");
  });
};

export const updatePost = (req, res) => {
  const q =
    "UPDATE blog.POSTS SET `title`=?,`description`=?,`img`=?,`category`=?,`tag`=?,`date`=?,`uid`=?,`username`=? WHERE `id` = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.img,
    req.body.category,
    req.body.tag,
    req.body.date,
    req.body.uid,
    req.body.username,
  ];

  db.query(q, [...values, req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
};
