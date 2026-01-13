import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { commentController } from "./comment.controller";

const router = Router();

router.get(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.getCommentById
);

router.get(
  "/author/:authorId",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.getCommentsByAuthor
);

router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.createComment
);

export const CommentRouter: Router = router;
