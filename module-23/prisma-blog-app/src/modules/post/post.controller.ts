import { Request, Response } from "express";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { UserRole } from "../../middlewares/auth";
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
      status?: PostStatus;
      authorId?: string;
    } = {};

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

    if (typeof req.query.authorId === "string") {
      filters.authorId = req.query.authorId;
    }

    // if (req.user) {
    //   filters.authorId = req.user.id;
    // }

    const { page, limit, sortBy, sortOrder } = paginationSortingHelper(
      req.query
    );
    Object.assign(filters, { page, limit, sortBy, sortOrder });

    // if (typeof req.query.page === "string") {
    //   filters.page = parseInt(req.query.page ?? "1", 10);
    // }
    // if (typeof req.query.limit === "string") {
    //   filters.limit = parseInt(req.query.limit ?? "10", 10);
    // }

    const posts = await postService.getAllPosts(filters);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts", details: error });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    const post = await postService.getPostById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve post", details: error });
  }
};

const getMyPosts = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const posts = await postService.getMyPosts(req.user.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve posts", details: error });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const isAdmin = req.user.role === UserRole.ADMIN;
    const result = await postService.updatePost(
      postId,
      req.user.id,
      req.body,
      isAdmin
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post", details: error });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const isAdmin = req.user.role === UserRole.ADMIN;
    const result = await postService.deletePost(postId, req.user.id, isAdmin);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post", details: error });
  }
};

const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await postService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve stats", details: error });
  }
};

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
  getStats,
};
