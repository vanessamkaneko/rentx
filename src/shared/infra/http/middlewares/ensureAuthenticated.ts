import express from "express"
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token is missing", 401)
  }

  // Bearer kajdoaishrj238sjk -> [Bearer kajdoaishrj238sjk] -> posição 0 é o Bearer e na 1 é o token, então...
  const [, token] = authHeader.split(" ") // ignoramos a posição 0 e atribuímos o valor da posição 1 p/ a variável token. Damos um split (dividimos) no espaço p/ pegar esses valores 

  try {
    const { sub: user_id } = verify(token, "1658682f37c18726c869a460b82db923") as IPayload;
    
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id)

    if(!user) {
      throw new AppError("User does not exist!", 401)
    }

    request.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError("Invalid token!", 401)
  }
 
}