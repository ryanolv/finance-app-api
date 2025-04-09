import bcrypt from "bcrypt";

import { EmailAlreadyExistsError } from "../../errors/user.js";
import { PostgresUpdateUserRepository } from "../../repositories/postgres/index.js";
import { UpdateUserParams } from "../../types/index.js";
import { GetUserByEmailRepository } from "../../interfaces/repositories/user.js";

export class UpdateUserUseCase {
  private getUserByEmailRepository: GetUserByEmailRepository;
  private updateUserRepository: PostgresUpdateUserRepository;

  constructor(
    getUserByEmailRepository: GetUserByEmailRepository,
    updateUserRepository: PostgresUpdateUserRepository,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.updateUserRepository = updateUserRepository;
  }
  async execute(userId: string, updatedUserParams: UpdateUserParams) {
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
