import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comment.js";
import cookieParser from "cookie-parser";
import { PORT } from "./db.js";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();
const whitelist = ["https://www.rubiks.live", "https://rubiks.live"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.listen(PORT, () => {
  console.log("connected on port: " + PORT);
});

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 15 minutes
  max: 15, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const limiter2 = rateLimit({
  windowMs: 30 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use("/api/auth/", cors(corsOptions), limiter, authRoutes);
app.use("/api/posts/", cors(corsOptions), limiter2, postRoutes);
app.use("/api/users/", cors(corsOptions), userRoutes);
app.use("/api/comments/", cors(corsOptions), limiter2, commentRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});
