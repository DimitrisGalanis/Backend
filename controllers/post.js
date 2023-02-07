import { db } from "../db.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

export const addPost = async (req, res) => {
  if (req.body.img === "empty")
    return res.status(403).json("Image is required.");
  const url = await cloudinary.uploader.upload(req.body.img);
  const q =
    "INSERT INTO blog.POSTS (`title`,`description`,`img`,`category`,`tag`,`date`,`uid`,`username`,`fullname` ) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    url.url,
    req.body.category,
    req.body.tag,
    req.body.date,
    req.body.uid,
    req.body.username,
    req.body.fullname,
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
    "UPDATE blog.POSTS SET `title`=?,`description`=?,`img`=?,`category`=?,`tag`=?,`date`=?,`uid`=?,`username`=?,`fullname`=? WHERE `id` = ?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.img,
    req.body.category,
    req.body.tag,
    req.body.date,
    req.body.uid,
    req.body.username,
    req.body.fullname,
  ];

  db.query(q, [...values, req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
};
