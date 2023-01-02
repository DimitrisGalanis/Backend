import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comment.js";
import cookieParser from "cookie-parser";
import { db } from "./db.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth/", authRoutes);
app.use("/api/posts/", postRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/comments/", commentRoutes);

app.listen(8800, () => {
  console.log("connected");
});

app.get("/123", (req, res) => {
  const q = "SELECT * FROM blog.users";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    console.log("userid: ", data[0].id);
    console.log("username: " + data[0].username);
    return res.json(data);
  });
});

app.get("/asdf", (req, res) => {
  const q =
    "INSERT INTO blog.USERS (`id`,`username`,`email`,`password`,`img` ) VALUES (?)";
  const values = [
    "1",
    "DimitrisGalanis",
    "dimitrisgal@gmail.com",
    "password",
    "",
  ];
  db.query(q, [values], (err, data) => {
    if (err) return "error";
    console.log(data);
    return res.json(data);
  });
});
