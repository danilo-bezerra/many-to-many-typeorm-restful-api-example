import { Request, Response } from "express";
import { TagRequest } from "../interfaces/TagRequest";
import { TagService } from "../services/tagService";

export class TagController {
  static async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          error: "All fields must be filled!",
        });
      }

      await TagService.create(name);

      return res.status(201).json({
        message: "Successful created!",
      });
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }

  static async update(req: TagRequest, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          error: "Name must be filled!",
        });
      }

      await TagService.update(req.tag, name);

      return res.status(200).json({
        message: "Successful updated!",
      });
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }

  static async delete(req: TagRequest, res: Response) {
    try {
      await TagService.delete(req.tag);

      return res.status(200).json({
        message: "Successful deleted!",
      });
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }

  static async findById(req: TagRequest, res: Response) {
    try {
      return res.json(req.tag);
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const tags = await TagService.findAll();

      return res.json(tags);
    } catch {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }
}
