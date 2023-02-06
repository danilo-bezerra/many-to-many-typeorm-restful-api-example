import { NextFunction, Request, Response } from "express";
import { TagRequest } from "../interfaces/TagRequest";
import { TagService } from "../services/tagService";
import { messages } from "../utils/messages";

export class TagMiddleware {
  static async tagExists(req: TagRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(messages.idNotProvided.status).json({
          error: messages.idNotProvided.message,
        });
      }
      const tag = await TagService.findById(Number(id));
      if (!tag) {
        return res.status(messages.notFound.status).json({
          error: messages.notFound.message,
        });
      }

      req.tag = tag;

      return next();
    } catch (e) {
      return res.status(messages.serverError.status).json({
        error: messages.serverError.message,
      });
    }
  }
}
