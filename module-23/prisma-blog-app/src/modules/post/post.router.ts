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
router.get("/stats", auth(UserRole.ADMIN), postController.getStats);
router.get("/:id", postController.getPostById);
router.post(
  "/",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.createPost
);
router.patch(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.updatePost
);

router.delete(
  "/:id",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.deletePost
);

export const PostRouter: Router = router;
