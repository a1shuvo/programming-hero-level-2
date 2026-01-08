import { Request, Response } from "express";
import { PostStatus } from "../../../generated/prisma/enums";
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
      isFeatured?: boolean | undefined;
      status: PostStatus | undefined;
    } = {
      status: undefined,
    };

    if (typeof req.query.search === "string") {
      filters.search = req.query.search;
    }

    if (typeof req.query.tags === "string") {
      filters.tags = req.query.tags.split(",").map((t) => t.trim());
    }

    if (typeof req.query.isFeatured === "string") {
      filters.isFeatured =
        req.query.isFeatured === "true"
          ? true
          : req.query.isFeatured === "false"
          ? false
          : undefined;
    }

    if (
      typeof req.query.status === "string" &&
      Object.values(PostStatus).includes(req.query.status as PostStatus)
    ) {
      filters.status = req.query.status as PostStatus;
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
