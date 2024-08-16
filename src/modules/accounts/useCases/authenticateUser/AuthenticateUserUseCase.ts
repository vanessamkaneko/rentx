import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError"

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string | undefined;
    email: string | undefined;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError("Email or password incorrect")
    }

    const passwordMatch = await compare(password, user.password!)

    if(!passwordMatch) {
      throw new AppError("Email or password incorrect")
    }

    const token = sign({}, "1658682f37c18726c869a460b82db923", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }