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

export const getPosts5 = (req, res) => {
  const q = "SELECT `id`,`img`,`title` FROM posts ORDER BY id DESC LIMIT 5";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getFrontPosts = (req, res) => {
  const q =
    "SELECT `img`,`id`,`title`,`date`,`category`,`tag` FROM posts where category = ? ORDER BY id DESC LIMIT 4";
  db.query(q, ["frontposts"], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getSportPosts = (req, res) => {
  const q =
    "SELECT `title`, `description`, `date`, `id`, `img` FROM posts WHERE category = ?";
  db.query(q, ["sports"], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const get3SportPosts = (req, res) => {
  const q =
    "SELECT `id`, `img` , `title`, `category`,`date`, `fullname` FROM posts WHERE category = ? ORDER BY id DESC LIMIT 3";
  db.query(q, ["sports"], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getOikonomia2Posts = (req, res) => {
  const q =
    "SELECT `id`, `img` , `title`, `category`,`date`, `fullname` FROM posts WHERE category = ? ORDER BY id DESC LIMIT 2";
  db.query(q, ["oikonomia"], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getOikonomiaPosts = (req, res) => {
  const q =
    "SELECT `id`, `img` , `title`, `category`,`date`, `fullname` FROM posts WHERE category = ?";
  db.query(q, ["oikonomia"], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};
export const getKosmosPosts = (req, res) => {
  const q =
    "SELECT `id`, `img` , `title`, `category`,`date`, `fullname` FROM posts WHERE category = ?";
  db.query(q, ["world"], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const get3KosmosPosts = (req, res) => {
  const q =
    "SELECT `id`, `img` , `title`, `category`,`date`, `description`, `fullname` FROM posts WHERE category = ? ORDER BY id DESC LIMIT 3";
  db.query(q, ["world"], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getPoliticsPosts = (req, res) => {
  const q =
    "SELECT `title`, `description`, `date`, `id`, `img` FROM posts WHERE category = ?";
  db.query(q, ["politiki"], (error, data) => {
    if (error) return res.json(error);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT `id`, `img` , `title` , `description`, `fullname` , `category` , `date` FROM POSTS WHERE id = ?";

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

  const q =
    "DELETE posts FROM users JOIN posts ON users.id = posts.uid  WHERE posts.id= ? AND posts.uid = ? and posts.username = ? and posts.fullname = ?";
  db.query(
    q,
    [postID, req.body.uid, req.body.username, req.body.fullname],
    (err, data) => {
      if (err) return res.status(403).json("error");
      if (data.affectedRows === 0) return res.send("No Post found");
      else return res.json("Post has been deleted.");
    }
  );

  // const q = "DELETE FROM posts WHERE `id` = ?";
  // db.query(q, [postID], (err, data) => {
  //   if (err) return res.status(403).json(err);
  //   return res.json("Post has been deleted.");
  // });
  // return res.json("Post has been deleted.");
};

export const updatePost = async (req, res) => {
  if (req.body.img === "empty")
    return res.status(403).json("Image is required.");

  if (!req.body.img.startsWith("http://res.cloudinary.com/")) {
    const url = await cloudinary.uploader.upload(req.body.img);
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
    const q =
      "UPDATE blog.POSTS SET `title`=?,`description`=?,`img`=?,`category`=?,`tag`=?,`date`=?,`uid`=?,`username`=?,`fullname`=? WHERE `id` = ?";

    db.query(q, [...values, req.body.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  } else {
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
    const q =
      "UPDATE blog.POSTS SET `title`=?,`description`=?,`img`=?,`category`=?,`tag`=?,`date`=?,`uid`=?,`username`=?,`fullname`=? WHERE `id` = ?";

    db.query(q, [...values, req.body.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  }
};
