import { In, Repository } from "typeorm";
import { AppDataSource } from "../../../../../../ormconfig";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name
    })

    await this.repository.save(specification)

    return specification;
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOne({ where: { name } })

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications  = await this.repository.findBy({
      id: In(ids)
    })

    return specifications
  }
}

export { SpecificationsRepository }