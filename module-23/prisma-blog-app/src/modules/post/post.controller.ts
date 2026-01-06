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

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const filters: {
      search?: string;
      tags?: string[];
    } = {};

    if (typeof req.query.search === "string") {
      filters.search = req.query.search;
    }

    if (typeof req.query.tags === "string") {
      filters.tags = req.query.tags.split(",").map((t) => t.trim());
    }

    const posts = await postService.getAllPosts(filters);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts", details: error });
  }
};

export const postController = {
  createPost,
  getAllPosts,
};
