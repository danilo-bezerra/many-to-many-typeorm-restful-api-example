import { Request } from "express";
import { Post } from "../entity/Post";

export interface PostRequest extends Request {
  post?: Post;
}
