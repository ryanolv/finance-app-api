import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/index.js";

import { EmailAlreadyExistsError } from "../../errors/user.js";
import { CreateUserParams } from "../../types/index.js";
import { CreateUserRepository } from "../../interfaces/repositories/user.js";

export type CreateUserUseCaseParams = Omit<CreateUserParams, "ID">;

export class CreateUserUseCase {
  private createUserRepository: CreateUserRepository;
  private getUserByEmailRepository: PostgresGetUserByEmailRepository;

  constructor(
    createUserRepository: CreateUserRepository,
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
