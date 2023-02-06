import { NextFunction, Request, Response } from "express";
import { PostRequest } from "../interfaces/postRequest";
import { TagRequest } from "../interfaces/TagRequest";
import { PostService } from "../services/postService";
import { TagService } from "../services/tagService";

export class PostMiddleware {
  static async postExists(req: PostRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          error: "Id field must be filled!",
        });
      }
      const post = await PostService.findById(Number(id));

      if (!post) {
        return res.status(400).json({
          error: "Not found!",
        });
      }

      req.post = post;
      return next();
    } catch (e) {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }
}
