import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import { Tag } from "./entity/Tag";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Post, Tag],
  migrations: [],
  subscribers: [],
});
