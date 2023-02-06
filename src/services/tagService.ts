import { Tag } from "../entity/Tag";
import { tagRepository } from "../repositories/tagRepository";

export class TagService {
  static async create(name: string) {
    const tag = new Tag();
    tag.name = name;
    await tagRepository.save(tag);
  }

  static async update(tag: Tag, name: string) {
    tag.name = name;
    await tagRepository.save(tag);
  }

  static async delete(tag: Tag) {
    await tagRepository.remove(tag);
  }

  static async findById(id: number) {
    const tag = await tagRepository.findOne({
      where: {
        id,
      },
    });

    return tag;
  }

  static async findAll() {
    const tags = await tagRepository.find({
      select: {
        id: true,
        name: true,
      },
    });

    return tags;
  }
}
