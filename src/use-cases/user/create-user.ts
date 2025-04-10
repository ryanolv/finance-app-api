import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { EmailAlreadyExistsError } from "../../errors/user.js";
import {
  CreateUserRepository,
  GetUserByEmailRepository,
} from "../../interfaces/repositories/user.js";
import { UseCase } from "../../interfaces/use-cases/user.js";
import { CreateUserUseCaseParams, User } from "../../types/index.js";

export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseParams, User>
{
  private createUserRepository: CreateUserRepository;
  private getUserByEmailRepository: GetUserByEmailRepository;

  constructor(
    createUserRepository: CreateUserRepository,
    getUserByEmailRepository: GetUserByEmailRepository,
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
  }

  async execute(createUserParams: CreateUserUseCaseParams): Promise<User> {
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
