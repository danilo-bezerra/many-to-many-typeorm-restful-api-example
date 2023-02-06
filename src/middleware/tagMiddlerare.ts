import { NextFunction, Request, Response } from "express";
import { TagRequest } from "../interfaces/TagRequest";
import { TagService } from "../services/tagService";

export class TagMiddleware {
  static async tagExists(req: TagRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          error: "Id field must be filled!",
        });
      }
      const tag = await TagService.findById(Number(id));
      if (!tag) {
        return res.status(400).json({
          error: "Not found!",
        });
      }

      req.tag = tag;

      return next();
    } catch (e) {
      return res.status(500).json({
        error: "A server error has ocurred!",
      });
    }
  }
}
