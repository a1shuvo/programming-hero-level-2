import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { postController } from "./post.controller";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", auth(UserRole.USER), postController.createPost);

export const PostRouter: Router = router;
