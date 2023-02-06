import { Request } from "express";
import { Tag } from "../entity/Tag";

export interface TagRequest extends Request {
  tag?: Tag;
}
