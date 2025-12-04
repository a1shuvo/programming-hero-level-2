import { Router } from "express";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/", userControllers.createUser);
router.get("/", logger, auth("admin"), userControllers.getUser);
router.get("/:id", userControllers.getSingleUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
