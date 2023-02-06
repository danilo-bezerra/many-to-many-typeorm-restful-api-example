import { Router } from "express";
import { TagController } from "../controllers/tagController";
import { TagMiddleware } from "../middleware/tagMiddlerare";

const tagRoutes = Router();

tagRoutes.post("/", TagController.create);
tagRoutes.put("/:id", TagMiddleware.tagExists, TagController.update);
tagRoutes.delete("/:id", TagMiddleware.tagExists, TagController.delete);
tagRoutes.get("/:id", TagMiddleware.tagExists, TagController.findById);
tagRoutes.get("/", TagController.findAll);

export default tagRoutes;
