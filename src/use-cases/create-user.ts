import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import {
  CreateUserParams,
  PostgresCreateUserRepository,
} from "../repositories/postgres/create-user.js";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email.js";

export type CreateUserUseCaseParams = Omit<CreateUserParams, "ID">;

export class CreateUserUseCase {
  async execute(createUserParams: CreateUserUseCaseParams) {
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository();

    const userWithProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email);

    if (userWithProvidedEmail) {
      throw new Error("User with provided email already exists.");
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    const user = {
      ...createUserParams,
      ID: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
