import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import {
  CreateUserParams,
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from "../repositories/postgres/index.js";

import { EmailAlreadyExistsError } from "../errors/user.js";

export type CreateUserUseCaseParams = Omit<CreateUserParams, "ID">;

export class CreateUserUseCase {
  async execute(createUserParams: CreateUserUseCaseParams) {
    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository();

    const userWithProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email);

    if (userWithProvidedEmail) {
      throw new EmailAlreadyExistsError();
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
