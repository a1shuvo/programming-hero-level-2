import { NextFunction, Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;

    const result = await commentService.createComment(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Comment ID is required" });
      return;
    }
    const result = await commentService.getCommentById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getCommentsByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorId } = req.params;
    const result = await commentService.getCommentsByAuthor(authorId as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error);
  }
};

const moderateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Comment ID is required" });
    }
    const result = await commentService.moderateComment(id, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
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
