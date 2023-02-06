import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";

export const tagRepository = AppDataSource.getRepository(Tag);
