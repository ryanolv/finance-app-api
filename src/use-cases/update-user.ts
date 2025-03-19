import bcrypt from "bcrypt";

import { EmailAlreadyExistsError } from "../errors/user";
import { PostgresGetUserByEmailRepository } from "../repositories/postgres/get-user-by-email";
import { PostgresUpdateUserRepository } from "../repositories/postgres/update-user";

export interface UpdateUserParams {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export class UpdateUseruseCase {
  async execute(userId: string, updatedUserParams: UpdateUserParams) {
    if (updatedUserParams.email) {
      const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

      const userWithProvideEmail =
        await postgresGetUserByEmailRepository.execute(updatedUserParams.email);

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

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const updatedUser = await postgresUpdateUserRepository.execute(
      userId,
      user,
    );
    return updatedUser;
  }
}
