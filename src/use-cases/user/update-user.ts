import bcrypt from "bcrypt";

import { EmailAlreadyExistsError } from "../../errors/user.js";
import { UpdateUserParams, User } from "../../types/index.js";
import {
  GetUserByEmailRepository,
  UpdateUserRepository,
} from "../../interfaces/repositories/user.js";
import { UpdateUserUseCaseInterface } from "../../interfaces/use-cases/user.js";

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  private getUserByEmailRepository: GetUserByEmailRepository;
  private updateUserRepository: UpdateUserRepository;

  constructor(
    getUserByEmailRepository: GetUserByEmailRepository,
    updateUserRepository: UpdateUserRepository,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.updateUserRepository = updateUserRepository;
  }
  async execute(
    userId: string,
    updatedUserParams: UpdateUserParams,
  ): Promise<User> {
    if (updatedUserParams.email) {
      const userWithProvideEmail = await this.getUserByEmailRepository.execute(
        updatedUserParams.email,
      );

      if (userWithProvideEmail) {
        throw new EmailAlreadyExistsError();
      }
    }

    const user = {
      ...updatedUserParams,
    };

    if (updatedUserParams.password) {
      const hashedPassword = await bcrypt.hash(updatedUserParams.password, 10);
      user.password = hashedPassword;
    }

    const updatedUser = await this.updateUserRepository.execute(userId, user);
    return updatedUser;
  }
}
