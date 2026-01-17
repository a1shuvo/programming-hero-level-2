import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { notFound } from "./middlewares/notFound";
import { CommentRouter } from "./modules/comment/comment.router";
import { PostRouter } from "./modules/post/post.router";

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
app.use("/comments", CommentRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Prisma Blog App!");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
