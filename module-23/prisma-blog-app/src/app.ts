import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import { PostRouter } from "./modules/post/post.router";

const app: Application = express();

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use("/posts", PostRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Prisma Blog App!");
});

export default app;
