import { Router } from "express";
import { PostController } from "../controllers/postController";
import { PostMiddleware } from "../middleware/postMiddleware";

const postRoutes = Router();

postRoutes.post("/", PostController.create);
postRoutes.put("/:id", PostMiddleware.postExists, PostController.update);
postRoutes.delete("/:id", PostMiddleware.postExists, PostController.delete);
postRoutes.get("/:id", PostMiddleware.postExists, PostController.findById);
postRoutes.get("/", PostController.findAll);

export default postRoutes;
