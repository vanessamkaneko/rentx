import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../../../../../../ormconfig";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreatUserDTO";



class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }
  async create({ name, email, driver_license, password, avatar, id, isAdmin }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, email, driver_license, password, avatar, id, isAdmin
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } })

    return user
  }
}

export { UsersRepository }