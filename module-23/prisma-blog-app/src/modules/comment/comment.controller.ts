import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;

    const result = await commentService.createComment(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment", details: error });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Comment ID is required" });
      return;
    }
    const result = await commentService.getCommentById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comment", details: error });
  }
};

const getCommentsByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const result = await commentService.getCommentsByAuthor(authorId as string);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments", details: error });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (id) {
      const result = await commentService.deleteComment(id, user.id);
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: "Comment ID is required" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment", details: error });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (id) {
      const result = await commentService.updateComment(id, user.id, req.body);
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: "Comment ID is required" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment", details: error });
  }
};

const moderateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Comment ID is required" });
    }
    const result = await commentService.moderateComment(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to moderate comment", details: error });
  }
};

export const commentController = {
  createComment,
  getCommentById,
  getCommentsByAuthor,
  deleteComment,
  updateComment,
  moderateComment,
};
