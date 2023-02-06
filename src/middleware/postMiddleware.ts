import { NextFunction, Request, Response } from "express";
import { PostRequest } from "../interfaces/postRequest";
import { TagRequest } from "../interfaces/TagRequest";
import { PostService } from "../services/postService";
import { TagService } from "../services/tagService";
import { messages } from "../utils/messages";

export class PostMiddleware {
  static async postExists(req: PostRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(messages.idNotProvided.status).json({
          error: messages.idNotProvided.message,
        });
      }
      const post = await PostService.findById(Number(id));

      if (!post) {
        return res.status(messages.notFound.status).json({
          error: messages.notFound.message,
        });
      }

      req.post = post;
      return next();
    } catch (e) {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }
}
