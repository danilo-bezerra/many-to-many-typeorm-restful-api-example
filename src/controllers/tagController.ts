import { Request, Response } from "express";
import { TagRequest } from "../interfaces/TagRequest";
import { TagService } from "../services/tagService";
import { messages } from "../utils/messages";

export class TagController {
  static async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(messages.fieldsNotProvided.status).json({
          error: messages.fieldsNotProvided.message,
        });
      }

      await TagService.create(name);

      return res.status(201).send();
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }

  static async update(req: TagRequest, res: Response) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(messages.fieldsNotProvided.status).json({
          error: messages.fieldsNotProvided.message,
        });
      }

      await TagService.update(req.tag, name);

      return res.status(204).send();
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }

  static async delete(req: TagRequest, res: Response) {
    try {
      await TagService.delete(req.tag);

      return res.status(204).send();
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }

  static async findById(req: TagRequest, res: Response) {
    try {
      return res.json(req.tag);
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const tags = await TagService.findAll();

      return res.json(tags);
    } catch {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }
}
