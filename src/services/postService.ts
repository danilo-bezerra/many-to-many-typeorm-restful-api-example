import { In } from "typeorm";
import { Post } from "../entity/Post";
import { postRepository } from "../repositories/postRepository";
import { tagRepository } from "../repositories/tagRepository";

export class PostService {
  static async create(title: string, body: string, tagIds: number[]) {
    const tags = await tagRepository.find({
      where: {
        id: In(tagIds),
      },
    });

    const post = new Post();
    post.title = title;
    post.body = body;
    post.tags = tags;

    await postRepository.save(post);
  }

  static async update(
    post: Post,
    title: string,
    body: string,
    tagIds: number[]
  ) {
    const tags = await tagRepository.find({
      where: {
        id: In(tagIds),
      },
    });

    post.title = title;
    post.body = body;
    post.tags = tags;
    await postRepository.save(post);
  }

  static async delete(post: Post) {
    await postRepository.remove(post);
  }

  static async findById(id: number) {
    const post = await postRepository.findOne({
      where: {
        id,
      },
      relations: {
        tags: true,
      },
    });

    return post;
  }

  static async findAll() {
    const posts = await postRepository.find({
      relations: {
        tags: true,
      },
    });

    return posts;
  }
}
