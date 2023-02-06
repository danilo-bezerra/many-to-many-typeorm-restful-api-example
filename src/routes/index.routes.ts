import { Router } from "express";
import postRoutes from "./post.routes";
import tagRoutes from "./tag.routes";

const routes = Router();

routes.use("/tags", tagRoutes);
routes.use("/posts", postRoutes);

export default routes;
