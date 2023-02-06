import { Request, Response } from "express";
import { PostRequest } from "../interfaces/postRequest";
import { PostService } from "../services/postService";
import { messages } from "../utils/messages";

export class PostController {
  static async create(req: Request, res: Response) {
    try {
      const { title, body, tagIds } = req.body;
      if (!title || !body || !tagIds.length) {
        return res.status(messages.fieldsNotProvided.status).json({
          error: messages.fieldsNotProvided.message,
        });
      }

      await PostService.create(title, body, tagIds);

      return res.status(201).send();
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }

  static async update(req: PostRequest, res: Response) {
    try {
      const { title, body, tagIds } = req.body;
      if (!title || !body || !tagIds.length) {
        return res.status(messages.fieldsNotProvided.status).json({
          error: messages.fieldsNotProvided.message,
        });
      }

      await PostService.update(req.post, title, body, tagIds);

      return res.status(204).send();
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }

  static async delete(req: PostRequest, res: Response) {
    try {
      await PostService.delete(req.post);

      return res.status(204).send();
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }

  static async findById(req: PostRequest, res: Response) {
    try {
      return res.json(req.post);
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const posts = await PostService.findAll();

      return res.json(posts);
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }
}
