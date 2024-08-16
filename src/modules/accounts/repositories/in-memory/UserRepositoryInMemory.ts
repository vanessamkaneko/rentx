import { ICreateUserDTO } from "@modules/accounts/dtos/ICreatUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({driver_license, email, name, password}: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      driver_license, email, name, password
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email)!
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id)!
  }
}

export { UserRepositoryInMemory }