import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import { db } from "./db.js";

const app = express();
app.use(express.json());
app.use("/api/posts/", postRoutes);
app.use("/api/users/", userRoutes);

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
    "2",
    "second username",
    "2nd email",
    "2nd password",
    "2nd img",
  ];
  db.query(q, [values], (err, data) => {
    if (err) return "error";
    console.log(data);
    return res.json(data);
  });
});
