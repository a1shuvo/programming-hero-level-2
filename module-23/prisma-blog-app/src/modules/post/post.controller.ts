import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const result = await postService.createPost(req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post", details: error });
  }
};

export const postController = {
  createPost,
};
