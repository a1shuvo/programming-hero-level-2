import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { postController } from "./post.controller";

const router = Router();

router.get("/", postController.getAllPosts);
router.get(
  "/my-posts",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getMyPosts
);
router.get("/:id", postController.getPostById);
router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.createPost
);

export const PostRouter: Router = router;
