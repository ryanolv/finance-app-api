import bcrypt from "bcrypt";

import { EmailAlreadyExistsError } from "../errors/user.js";
import {
  PostgresGetUserByEmailRepository,
  PostgresUpdateUserRepository,
} from "../repositories/postgres/index.js";

export interface UpdateUserParams {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export class UpdateUserUseCase {
  private getUserByEmailRepository: PostgresGetUserByEmailRepository;
  private updateUserRepository: PostgresUpdateUserRepository;

  constructor(
    getUserByEmailRepository: PostgresGetUserByEmailRepository,
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
