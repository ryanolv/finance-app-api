import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from "../../repositories/postgres/index.js";

import { EmailAlreadyExistsError } from "../../errors/user.js";
import { CreateUserParams } from "../../types/index.js";

export type CreateUserUseCaseParams = Omit<CreateUserParams, "ID">;

export class CreateUserUseCase {
  private createUserRepository: PostgresCreateUserRepository;
  private getUserByEmailRepository: PostgresGetUserByEmailRepository;

  constructor(
    createUserRepository: PostgresCreateUserRepository,
    getUserByEmailRepository: PostgresGetUserByEmailRepository,
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
  }

  async execute(createUserParams: CreateUserUseCaseParams) {
    const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
      createUserParams.email,
    );

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

    const createdUser = await this.createUserRepository.execute(user);

    return createdUser;
  }
}
