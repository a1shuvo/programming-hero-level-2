import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import { PostRouter } from "./modules/post/post.router";
import { CommentRouter } from "./modules/comment/comment.router";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use("/posts", PostRouter);
app.use('/comments', CommentRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Prisma Blog App!");
});

export default app;
