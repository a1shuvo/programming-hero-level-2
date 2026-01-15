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

router.patch(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.updateComment
);

router.patch(
  "/:id/moderate",
  auth(UserRole.ADMIN),
  commentController.moderateComment
);

router.delete(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  commentController.deleteComment
);

export const CommentRouter: Router = router;
