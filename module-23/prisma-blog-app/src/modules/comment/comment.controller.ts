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

export const commentController = {
  createComment,
  getCommentById,
  getCommentsByAuthor,
};
