import { Request, Response } from "express";
import { PostRequest } from "../interfaces/postRequest";
import { PostService } from "../services/postService";

export class PostController {
  static async create(req: Request, res: Response) {
    try {
      const { title, body, tagIds } = req.body;
      if (!title || !body || !tagIds.length) {
        return res.status(400).json({
          error: "All fields must be filled!",
        });
      }

      await PostService.create(title, body, tagIds);

      return res.status(201).json({
        message: "Successful created!",
      });
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }

  static async update(req: PostRequest, res: Response) {
    try {
      const { title, body, tagIds } = req.body;
      if (!title || !body || !tagIds.length) {
        return res.status(400).json({
          error: "All fields must be filled!",
        });
      }

      await PostService.update(req.post, title, body, tagIds);

      return res.status(200).json({
        message: "Successful updated!",
      });
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }

  static async delete(req: PostRequest, res: Response) {
    try {
      

      await PostService.delete(req.post);

      return res.status(200).json({
        message: "Successful deleted!",
      });
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }

  static async findById(req: PostRequest, res: Response) {
    try {
      return res.json(req.post);
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const posts = await PostService.findAll();

      return res.json(posts);
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }
}
