
import { ICreateUserDTO } from "../../dtos/ICreatUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@test.com",
      password: "1234",
      name: "User Test"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email!,
      password: user.password!
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate a nonexisting user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "8877"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate with incorrect password", async () => {

    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user2@user.com",
        password: "1234",
        name: "User2 Test Error"
      }
      
      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email!,
        password: "4321"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})